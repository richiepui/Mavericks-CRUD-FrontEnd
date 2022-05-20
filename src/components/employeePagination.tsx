import { Grid, Typography, Box } from "@material-ui/core/";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";

interface PageProps {
  numberOfPages: number;
  lengthOfEmp: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const useStyles = makeStyles((theme) => ({
  leftSideDetails: {
    paddingTop: "6px",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#365271",
    fontWeight: "bold",
    [theme.breakpoints.only("xs")]: {
      display: "none",
    },
  },
  pageNumber: {
    paddingTop: "6px",
    paddingLeft: "10px",
    paddingRight: "10px",
    color: "#365271",
    fontWeight: "bold",
  },
}));

export default function EmployeePagination(props: PageProps) {
  const dPageSize = 10;
  const classes = useStyles();

  const cardsCount = () => {
    if (props.lengthOfEmp < props.page * dPageSize + 10) {
      return props.lengthOfEmp;
    } else {
      return props.page * dPageSize + 10;
    }
  };

  const handleIncrement = () => {
    if (!(props.page + 1 >= props.numberOfPages)) {
      props.setPage(props.page + 1);
    }
  };

  const handleDecrement = () => {
    if (!(props.page + 1 === 1)) {
      props.setPage(props.page - 1);
    }
  };

  const handleDisableNext = () => {
    if (props.page + 1 === props.numberOfPages) {
      return true;
    } else {
      return false;
    }
  };

  const handleDisablePrev = () => {
    if (props.page + 1 === 1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Grid container direction="row" style={{ display: "flex" }}>
      <Grid item style={{ flex: 1 }}>
        <Typography className={classes.leftSideDetails}>
          Showing {props.page * dPageSize + 1}-{cardsCount()} out of{" "}
          {props.lengthOfEmp} entries
        </Typography>
      </Grid>
      <Grid item>
        <Button
          disabled={handleDisablePrev()}
          sx={{ fontWeight: "bold", color: "#365271" }}
          onClick={handleDecrement}
        >
          Previous
        </Button>
      </Grid>
      <Grid item>
        <Typography className={classes.pageNumber}>{props.page + 1}</Typography>
      </Grid>
      <Grid item>
        <Button
          disabled={handleDisableNext()}
          onClick={handleIncrement}
          sx={{ fontWeight: "bold", color: "#365271" }}
        >
          Next
        </Button>
      </Grid>
    </Grid>
  );
}
