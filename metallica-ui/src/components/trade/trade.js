import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Select from "@material-ui/core/Select";
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import RefreshIcon from "@material-ui/icons/Refresh";
import SaveIcon from "@material-ui/icons/Save";
import PropTypes from "prop-types";
import React from "react";

const styles = theme => ({
  paper: {
    padding: "5px"
  },
  formControl: {
    minWidth: 120
  },
  radioFormControl: {
    minWidth: 120,
    flexFlow: "row"
  },
  formContainer: {
    display: "flex",
    flexFlow: "Column"
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "flex-end"
  },
  headerContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "space-between",
    borderBottom: "2px ridge",
    marginTop: 5
  },
  headerButtons: {
    padding: 0,
    alignSelf: "flex-end",
    margin: 0,
  },
  group: {
    flexFlow: "row"
  },
  compactHeight: {
    height: 45,
    margin: "5px 0"
  },
  header: {
    fontSize: "1.1em",
    lineHeight: 0,
    marginTop: 10
  },
  saveButton: {
    height: 40,
    width: 40
  }
});

function renderOptions(refData) {
  let optionNone = (
    <MenuItem key="" value="">
      <em>None</em>
    </MenuItem>
  );
  let options = refData.map(data => (
    <MenuItem key={data.code} value={data.code}>
      {data.description}
    </MenuItem>
  ));
  return [optionNone, ...options];
}

function renderHeaderButtons(props) {
  let { selectedTrade } = props;

  const handleTradeDeletion = event => {
    event.preventDefault();
    props.onTradeDelete();
  };

  const handleTradeReset = event => {
    event.preventDefault();
    props.onTradeReset();
  };

  let deleteButton = (
    <IconButton
      aria-label="Reset"
      color="secondary"
      className={props.classes.headerButtons}
      onClick={handleTradeDeletion}
    >
      <DeleteIcon fontSize="small" />
    </IconButton>
  );

  let resetButton = (
    <IconButton
      aria-label="Reset"
      className={props.classes.headerButtons}
      onClick={handleTradeReset}
    >
      <RefreshIcon fontSize="small" />
    </IconButton>
  );

  return selectedTrade && selectedTrade.tradeId ? (
    <>
      {resetButton}
      {deleteButton}
    </>
  ) : (
    <>{resetButton}</>
  );
}

function isValidTrade(selectedTrade) {
  return (
    selectedTrade.tradeDate &&
    selectedTrade.commodity &&
    selectedTrade.side &&
    selectedTrade.price &&
    !isNaN(selectedTrade.price) &&
    selectedTrade.quantity &&
    !isNaN(selectedTrade.quantity) &&
    selectedTrade.counterParty &&
    selectedTrade.location
  );
}

function Trade(props) {
  const { selectedTrade, refData } = props;

  const handleSavingTrade = event => {
    event.preventDefault();
    if (isValidTrade(selectedTrade)) {
      props.onTradeSave();
    } else {
      alert("Correct the trade form before submitting");
    }
  };

  let tradeHeader = "Trade";
  let btnlabel = "Add New Trade";
  let btnIcon = <AddIcon />;

  if (selectedTrade && selectedTrade.tradeId) {
    tradeHeader = `Trade : ${selectedTrade.tradeId}`;
    btnlabel = "Save Trade";
    btnIcon = <SaveIcon />;
  }

  return (
    <Paper className={props.classes.paper}>
      <div className={props.classes.headerContainer}>
        <Typography
          component="h1"
          variant="h6"
          className={props.classes.header}
        >
          {tradeHeader}
        </Typography>
        <div className={props.classes.buttonContainer}>
          {renderHeaderButtons(props)}
        </div>
      </div>

      <form className={props.classes.formContainer} noValidate={false}>
        <div className={props.classes.formControl}>
          <TextField
            fullWidth
            autoFocus
            id="tradeDate"
            label="Trade Date"
            type="date"
            value={selectedTrade.tradeDate}
            onChange={props.onTradeValueChange("tradeDate")}
            required
            InputLabelProps={{
              shrink: true
            }}
            className={props.classes.compactHeight}
          />
        </div>

        <FormControl
          required
          className={
            props.classes.formControl + " " + props.classes.compactHeight
          }
        >
          <InputLabel htmlFor="commodity" shrink>
            Commodity
          </InputLabel>
          <Select
            value={selectedTrade.commodity}
            onChange={props.onTradeValueChange("commodity")}
            name="commodity"
            id="commodity"
          >
            {renderOptions((refData && refData.commodities) || [])}
          </Select>
        </FormControl>

        <FormControl
          required
          fullWidth
          className={
            props.classes.radioFormControl + " " + props.classes.compactHeight
          }
        >
          <InputLabel htmlFor="Side" shrink>
            Side
          </InputLabel>
          <RadioGroup
            aria-label="Side"
            name="side"
            className={props.classes.group}
            value={selectedTrade.side}
            onChange={props.onTradeValueChange("side")}
            id="side"
          >
            <FormControlLabel value="BUY" control={<Radio />} label="BUY" />
            <FormControlLabel value="SELL" control={<Radio />} label="SELL" />
          </RadioGroup>
        </FormControl>

        <FormControl
          required
          className={
            props.classes.formControl + " " + props.classes.compactHeight
          }
        >
          <InputLabel htmlFor="counterParty" shrink>
            Counter Party
          </InputLabel>
          <Select
            value={selectedTrade.counterParty}
            onChange={props.onTradeValueChange("counterParty")}
            id="counterParty"
            name="counterParty"
          >
            {renderOptions((refData && refData.counterParties) || [])}
          </Select>
        </FormControl>

        <div className={props.classes.formControl}>
          <TextField
            fullWidth
            type="number"
            id="price"
            label="Price"
            value={selectedTrade.price}
            onChange={props.onTradeValueChange("price")}
            required
            InputProps={{
              shrink: true,
              startAdornment: (
                <InputAdornment position="start">
                  {selectedTrade.currency || "$"}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">{"/MT"}</InputAdornment>
              )
            }}
            className={props.classes.compactHeight}
          />
        </div>

        <div className={props.classes.formControl}>
          <TextField
            fullWidth
            type="number"
            id="quantity"
            label="Quantity"
            value={selectedTrade.quantity}
            onChange={props.onTradeValueChange("quantity")}
            required
            InputProps={{
              shrink: true,
              endAdornment: (
                <InputAdornment position="end">{"MT"}</InputAdornment>
              )
            }}
            className={props.classes.compactHeight}
          />
        </div>

        <FormControl
          required
          className={
            props.classes.formControl + " " + props.classes.compactHeight
          }
        >
          <InputLabel htmlFor="location" shrink>
            Location
          </InputLabel>
          <Select
            value={selectedTrade.location}
            onChange={props.onTradeValueChange("location")}
            name="location"
            id="location"
          >
            {renderOptions((refData && refData.locations) || [])}
          </Select>
        </FormControl>

        <div className={props.classes.buttonContainer}>
          <Fab
            color="primary"
            aria-label={btnlabel}
            className={props.classes.saveButton}
            onClick={handleSavingTrade}
            type="submit"
          >
            {btnIcon}
          </Fab>
        </div>
      </form>
    </Paper>
  );
}

Trade.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Trade);
