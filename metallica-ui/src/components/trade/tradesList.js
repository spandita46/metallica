import withStyles from "@material-ui/core/styles/withStyles";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AgGridReact } from "ag-grid-react";
import PropTypes from "prop-types";
import React from "react";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  gridContainer: {
    display: "flex", // Fix IE 11 issue.
    flexFlow: "Column",
    height: "calc(100vh - 250px)"
  },
  paper: {
    width: "98%",
    margin: "auto",
    padding: "10px"
  }
});

const columnDefs = [
  { headerName: "Trade Id", field: "tradeId", hide: true },
  { headerName: "", checkboxSelection: true, width: 60 },
  { headerName: "Trade Date", field: "tradeDate" },
  { headerName: "Commodity", field: "commodity", width: 150 },
  { headerName: "Side", field: "side", width: 75 },
  { headerName: "Qty(MT)", field: "quantity", width: 100 },
  { headerName: "Price(/MT)", field: "price", width: 100 },
  { headerName: "Counterparty", field: "counterParty", width: 150 },
  { headerName: "Location", field: "location", width: 150 }
];

let _gridApi;

function TradesList(props) {
  const onGridReady = params => {
    _gridApi = params.api;
  };

  const onSelectionChanged = () => {
    if (_gridApi) {
      var selectedRow = _gridApi.getSelectedRows()[0];
      props.onTradeSelection(selectedRow);
    }
  };

  return (
    <Paper className={props.classes.paper}>
      <div className={`ag-theme-balham ${props.classes.gridContainer}`}>
        <AgGridReact
          onGridReady={onGridReady}
          columnDefs={columnDefs}
          rowData={props.trades}
          rowSelection="single"
          enableSorting={true}
          enableFilter={true}
          onSelectionChanged={onSelectionChanged}
          pagination={true}
        />
      </div>
    </Paper>
  );
}

TradesList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TradesList);
