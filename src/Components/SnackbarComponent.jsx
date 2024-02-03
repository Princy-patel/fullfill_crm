import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SnackbarContext from "../Store/SnackbarContext";

function SnackbarComponent() {
  const { snack, setSnack } = useContext(SnackbarContext);

  const action = (
    <React.Fragment>
      <Button
        color="secondary"
        size="small"
        onClick={() => setSnack({ ...snack, open: false })}
      >
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setSnack({ ...snack, open: false })}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
        message={snack.message}
        action={action}
      />
    </div>
  );
}

export default SnackbarComponent;
