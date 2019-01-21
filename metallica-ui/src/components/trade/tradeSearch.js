import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  textField: {
    margin: theme.spacing.unit,
    width: 120
  },
  dateFields: {
    margin: theme.spacing.unit,
    width: 165
  },
  radioFormControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    flexFlow: "row"
  },
  formContainer: {
    display: "flex",
    flexFlow: "row"
  },
  buttonContainer: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "flex-end"
  },
  margin: {
    margin: theme.spacing.unit
  },
  headerButtons: {
    padding: 0,
    alignSelf: "flex-end"
  },
  group: {
    flexFlow: "row"
  },
  error: {
    color: "red"
  }
});

class TradeSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { searchCriteria: this.getInitialSearchCriteria() };
  }

  getInitialSearchCriteria = () => {
    return {
      tradeFromDate: "",
      tradeToDate: "",
      buySide: "",
      sellSide: "",
      quantity: "",
      price: "",
      counterParty: "",
      commodity: "",
      location: ""
    };
  };

  resetSearch = () => {
    this.setState(
      {
        searchCriteria: this.getInitialSearchCriteria()
      },
      () => {
        this.props.onSearchReset();
      }
    );
  };

  handleValueChange = name => event => {
    const { searchCriteria } = this.state;
    let newSearchCriteria = { ...searchCriteria };
    newSearchCriteria[name] = event.target.value;
    this.setState({
      searchCriteria: newSearchCriteria
    });
  };

  handleCheckValueChange = name => event => {
    const { searchCriteria } = this.state;
    let newSearchCriteria = { ...searchCriteria };
    newSearchCriteria[name] = event.target.checked ? event.target.value : "";
    this.setState({
      searchCriteria: newSearchCriteria
    });
  };

  handleSearch = event => {
    event.preventDefault();
    const { searchCriteria } = this.state;
    this.props.onSearch(searchCriteria);
  };

  renderOptions = refData => {
    let optionALL = (
      <MenuItem key="ALL" value="ALL">
        <em>ALL</em>
      </MenuItem>
    );
    let options = refData.map(data => (
      <MenuItem key={data.code} value={data.code}>
        {data.description}
      </MenuItem>
    ));
    return [optionALL, ...options];
  };

  render() {
    const { classes, refData } = this.props;
    const { searchCriteria } = this.state;
    return (
      <div className="row">
        <div className="Column col-xs-12">
          <Paper>
            <form className={classes.formContainer} noValidate={false}>
              <div className={classes.dateFields}>
                <TextField
                  autoFocus
                  id="tradeFromDate"
                  label="From Date"
                  type="date"
                  value={searchCriteria.tradeFromDate}
                  onChange={this.handleValueChange("tradeFromDate")}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>

              <div className={classes.dateFields}>
                <TextField
                  InputLabelProps={{
                    shrink: true
                  }}
                  id="tradeToDate"
                  label="To Date"
                  type="date"
                  value={searchCriteria.tradeToDate}
                  onChange={this.handleValueChange("tradeToDate")}
                />
              </div>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="commodity" shrink>
                  Commodity
                </InputLabel>
                <Select
                  value={searchCriteria.commodity}
                  onChange={this.handleValueChange("commodity")}
                  name="commodity"
                  id="commodity"
                >
                  {this.renderOptions((refData && refData.commodities) || [])}
                </Select>
              </FormControl>

              <FormControl className={classes.radioFormControl}>
                <InputLabel htmlFor="Side" shrink>
                  Side
                </InputLabel>
                <FormGroup className={classes.group}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchCriteria.buySide}
                        onChange={this.handleCheckValueChange("buySide")}
                        value="BUY"
                      />
                    }
                    label="BUY"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={searchCriteria.sellSide}
                        onChange={this.handleCheckValueChange("sellSide")}
                        value="SELL"
                      />
                    }
                    label="SELL"
                  />
                </FormGroup>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="counterParty" shrink>
                  Counter Party
                </InputLabel>
                <Select
                  value={searchCriteria.counterParty}
                  onChange={this.handleValueChange("counterParty")}
                  id="counterParty"
                  name="counterParty"
                >
                  {this.renderOptions(
                    (refData && refData.counterParties) || []
                  )}
                </Select>
              </FormControl>

              <div className={classes.textField}>
                <TextField
                  type="number"
                  id="price"
                  label="Price"
                  value={searchCriteria.price}
                  onChange={this.handleValueChange("price")}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </div>

              <div className={classes.textField}>
                <TextField
                  InputLabelProps={{
                    shrink: true
                  }}
                  type="number"
                  id="quantity"
                  label="Quantity"
                  value={searchCriteria.quantity}
                  onChange={this.handleValueChange("quantity")}
                />
              </div>

              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="location" shrink>
                  Location
                </InputLabel>
                <Select
                  value={searchCriteria.location}
                  onChange={this.handleValueChange("location")}
                  name="location"
                  id="location"
                >
                  {this.renderOptions((refData && refData.locations) || [])}
                </Select>
              </FormControl>

              <div className={classes.buttonContainer}>
                <IconButton
                  color="primary"
                  aria-label={"Search"}
                  className={classes.margin}
                  onClick={this.handleSearch}
                  type="submit"
                >
                  <SearchIcon />
                </IconButton>

                <IconButton
                  color="secondary"
                  aria-label={"Reset"}
                  className={classes.margin}
                  onClick={this.resetSearch}
                >
                  <RefreshIcon />
                </IconButton>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

TradeSearch.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TradeSearch);
