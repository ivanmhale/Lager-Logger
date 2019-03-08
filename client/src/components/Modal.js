import React, { useContext, Fragment } from "react";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import CircularProgress from "@material-ui/core/CircularProgress";
import Context from "../config/Context";
import Rating from "react-rating";

const renderSaving = context => {
  const state = context.state;
  const toBeSaved = state.selectedBeer;
  let { beer_name, beer_label } = toBeSaved.beer;
  let { brewery_name } = toBeSaved.brewery;
  let rating = 0;
  return (
    <div className="modal_body">
      <div className="section section_beer">
        <h1>{beer_name}</h1>
        <div className="img_container">
          <img src={beer_label} alt={beer_name} />
        </div>
        <h3>Made by {brewery_name}</h3>
      </div>
      <hr />
      <div className="section section_input">
        <div className="rating">
          Leave your rating:
          <Rating id="slider" onChange={rate => (rating = rate)} />
        </div>
        <div className="comments">
          <TextField
            id="comments"
            multiline
            placeholder="Write your comments here"
          />
        </div>
      </div>
      <div className="modal_body-buttons">
        <Button className="btn btn_action" onClick={() => context.setSaving()} variant="outlined">
          Back
        </Button>
        <Button
        className="btn btn_finish"
          onClick={() =>
            context.saveBeer({
              userId: state.user.userId,
              bid: toBeSaved.beer.bid,
              beer: {
                beer_abv: toBeSaved.beer.beer_abv,
                beer_description: toBeSaved.beer.beer_description,
                beer_label: toBeSaved.beer.beer_label,
                beer_name: toBeSaved.beer.beer_name,
                beer_style: toBeSaved.beer.beer_style,
                bid: toBeSaved.bid,
                brewery_name: toBeSaved.brewery.brewery_name
              },
              rating: rating,
              comments: document.getElementById("comments").value
            })
          }
          variant="outlined"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};

const renderDetails = context => {
  let {
    beer_name,
    beer_abv,
    beer_description,
    beer_label,
    beer_style
    // bid
  } = context.state.selectedBeer.beer;

  let {
    brewery_name,
    brewery_label,
    brewery_type
  } = context.state.selectedBeer.brewery;

  let location = context.state.selectedBeer.brewery.location;
  // let contact = context.state.selectedBeer.brewery.contact;

  return (
    <div className="modal_body">
      <div className="modal_body-info">
        <div className="modal_body_side-1">
          <img src={beer_label} alt={beer_name} />
          <h1>{beer_name}</h1>
        </div>
        <div className="modal_body_side-2">
          <h3>
            {brewery_name}, <i>{brewery_type}</i>
          </h3>
          <div className="elContainer">
            <img src={brewery_label} alt={brewery_name} />
          </div>
          <p>
            {location
              ? location.brewery_city + ", " + location.brewery_state
              : ""}
          </p>
          <div className="elContainer">
            <hr />
          </div>
          <h4>
            Style - <i>{beer_style}</i>
          </h4>
          <h4>
            ABV - <i>{beer_abv}%</i>
          </h4>
          <p>{beer_description}</p>
        </div>
      </div>
      <div className="modal_body-buttons">
        <Button
          id="btn_save"
          className="btn btn_finish"
          variant="outlined"
          onClick={() => {
            !context.state.user.userId
              ? context.setPopover("btn_save", "You must be signed in!")
              : context.setSaving();
          }}
        >
          Save <AddIcon />
        </Button>
      </div>
    </div>
  );
};

const renderFunction = () => {
  const context = useContext(Context);
  if (context.state.loading) {
    return <CircularProgress id="spinner" />;
  } else if (context.state.selectedBeer !== null && !context.state.saving) {
    return renderDetails(context);
  } else if (context.state.saving) {
    return renderSaving(context);
  } else if (context.state.savedBeer.bid) {
    return renderSaved(context);
  }
  return;
};

const renderSaved = context => {
  const viewingBeer = context.state.savedBeer;
  let {
    beer_name,
    beer_abv,
    beer_description,
    beer_label,
    beer_style,
    brewery_name
  } = viewingBeer.beer;
  let { bid, comments, rating, userId } = viewingBeer;
  let newRating = 0;

  return (
    <div className="modal_body modal_body_editing">
      <div className="saved_beer_info">
        <div className="side side_1">
          <h1>{beer_name}</h1>
          <img src={beer_label} alt={beer_name} />
          <h3>By {brewery_name}</h3>
          <p>{beer_description}</p>
          <div className="stats">
            <p>Style: {beer_style}</p>
            <p>ABV: {beer_abv}</p>
          </div>
        </div>
        <div className="side side_2">
          <h2>YOUR RATING: {rating}</h2>
          {context.state.editing ? (
            <Rating
              initialRating={rating}
              onChange={rate => (newRating = rate)}
            />
          ) : (
            <Rating initialRating={rating} readonly />
          )}
          {context.state.editing ? (
            <input id="editComments" placeholder={comments} />
          ) : (
            <p>{comments}</p>
          )}
        </div>
      </div>
      <hr />
      <div className="modal_body-buttons">
        {context.state.editing ? (
          <Fragment>
            <Button
              className="btn btn_action"
              variant="outlined"
              onClick={() => {
                context.toggleEditBeer();
              }}
            >
              Back <AddIcon />
            </Button>
            <Button
              className="btn btn_finish"
              variant="outlined"
              onClick={() => {
                context.saveChanges({
                  userId,
                  bid,
                  rating: newRating,
                  comments: document.getElementById("editComments").value
                });
              }}
            >
              Save <AddIcon />
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Button
              className="btn btn_danger"
              variant="outlined"
              onClick={() => {
                context.removeBeer({ userId, bid });
              }}
            >
              Remove <AddIcon />
            </Button>
            <Button
              className="btn btn_action"
              variant="outlined"
              onClick={() => {
                context.toggleEditBeer();
              }}
            >
              Edit <AddIcon />
            </Button>
          </Fragment>
        )}
      </div>
    </div>
  );
};

const ModalComponent = () => {
  const context = useContext(Context);
  return (
    <Modal
      className="modal_container"
      open={
        context.state.selectedBeer !== null ||
        context.state.loading ||
        context.state.saving ||
        context.state.savedBeer.bid
          ? true
          : false
      }
      onBackdropClick={() => {
        context.setSelectedBeer(null);
        if (context.state.saving) {
          context.setSaving();
        }
        if (context.state.editing) {
          context.toggleEditBeer();
        }
        context.viewSavedBeer({});
      }}
    >
      <Paper className="modal">{renderFunction()}</Paper>
    </Modal>
  );
};

export default ModalComponent;
