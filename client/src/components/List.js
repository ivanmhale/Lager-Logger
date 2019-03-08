import React, { useContext } from "react";
import Context from "../config/Context";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

const renderList = context => {
  return context.state.beerList.map(beer => {
    let {
      beer_name,
      // beer_abv,
      // beer_description,
      beer_label,
      beer_style,
      bid
    } = beer.beer;

    let {
      brewery_name
      // brewery_label,
      // brewery_type,
      // contact,
      // location
    } = beer.brewery;
    // let { instagram, facebook, url } = contact;
    // let { brewery_city, brewery_state } = location;
    return (
      <TableRow
        hover
        className="trow"
        key={bid}
        onClick={() => context.setSelectedBeer(beer)}
      >
        <TableCell className="tcell">
          <img src={beer_label} alt={beer_name} />
        </TableCell>
        <TableCell className="tcell tcell_name-style">
          <h3>{beer_name}</h3>
          <h4>{beer_style}</h4>
        </TableCell>
        <TableCell className="tcell tcell_brewery">{brewery_name}</TableCell>
      </TableRow>
    );
  });
};
const List = () => {
  const context = useContext(Context);

  if (context.state.beerList !== null) {
    return (
      <div id="List">
        <Table id="table">
          <TableBody>{renderList(context)}</TableBody>
        </Table>
      </div>
    );
  }
  return "Loading...";
};

export default List;
