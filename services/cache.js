const mongoose = require("mongoose");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(process.env.REDIS_URL | redisUrl);
const util = require("util");
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function(options={}){
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || "");

    return this;
};

mongoose.Query.prototype.exec = async function(){
    if (!this.useCache){
        return exec.apply(this, arguments);
    }

    var key = Object.assign({}, this.getQuery(), {
       collection: this.mongooseCollection.name
    });

    key = JSON.stringify(key);

    // see if we have a value for key in redis
    const cached = await client.hget(this.hashKey, key);

    // if so, return that
    if (cached){
        console.log("Serving from redis (cache)");
        const doc = JSON.parse(cached);
        return Array.isArray(doc)
            ? doc.map(d => this.model(d))
            : new this.model(doc);
    }

    // otherwise, issue the query and store the result in redis
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), "EX", 60*60*24*7);
    console.log("Serving from MongoDB");
    return result;
};

module.exports = {
    clearHash (hashKey){
       client.del(JSON.stringify((hashKey)));
    }
}