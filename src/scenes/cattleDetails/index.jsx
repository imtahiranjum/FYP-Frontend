import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import Header from "components/Header";
import { useNavigate } from "react-router-dom";
import {
  useAddNewCattleMutation,
  useGetAllCattleQuery,
  useRemoveCattleFromSaleMutation,
  useUpdateCattleOnSaleStatusMutation,
} from "state/api";

const CattleCard = ({
  _id,
  name,
  gender,
  images,
  color,
  weight,
  age,
  is_boarded,
  category,
  health,
  feed,
  device,
  farm,
}) => {
  const navigate = useNavigate();
  const propsToPass = {
    _id,
    name,
    gender,
    images,
    color,
    weight,
    age,
    is_boarded,
    category,
    health,
    feed,
    device,
    farm,
  };
  const theme = useTheme();
  const buttonState = "Remove From Sale";
  const buttonColorState = "red" ;
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [is_onsale, setIsOnSale] = useState(false);

  const [removeCattleFromSale] = useRemoveCattleFromSaleMutation();
  const [updateCattleOnSaleStatus] = useUpdateCattleOnSaleStatusMutation();
  const navigateToAddCattleToSale = () => {
    navigate("/addcattletosale", { replace: false, state: { propsToPass } });
  };
  const navigateToAllCattle = () => {
    navigate("/cattlelist", { replace: false });
  };
  const handleAddToSale = () => {
    navigateToAddCattleToSale();
  };
  const handleRemoveFromSale = async () => {
    const payload = await removeCattleFromSale(_id);
    const payload2 = await updateCattleOnSaleStatus({
      cattle_id: _id,
      to_add: false,
    });    
    navigateToAllCattle();
    setAlertOpen(true);
  };

  useEffect(() => {
    if (agree) {
      handleRemoveFromSale();
    }
  }, [agree]);

  const handleClose = () => {
    setOpen(false);
  };

  const buttonClickAction = () => {
    if (is_onsale) {
      setOpen(true);
    } else {
      handleAddToSale();
    }
  };
  const handleAgreeButton = () => {
    setAgree(true);
    setOpen(false);
  };

  
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  return (
    <Box>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Card
          sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            // borderRadius: "0.55rem",
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            <strong>{"Remove Cattle From Sale?"}</strong>
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <strong>Cattle will be removed form the Marketplace.</strong>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{
                color: theme.palette.secondary[400],
              }}
              autoFocus
              onClick={(e) => {
                handleClose(e);
              }}
            >
              <strong>No</strong>
            </Button>
            <Button
              sx={{
                color: "red",
              }}
              onClick={() => {
                handleAgreeButton();
              }}
              autoFocus
            >
              <strong> Yes </strong>
            </Button>
          </DialogActions>
        </Card>
      </Dialog>

      <Box sx={{ width: 500 }}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={alertOpen}
          onClose={handleAlertClose}
          autoHideDuration={6000}
          key={"bottomcenter"}
        >
          <Alert
            onClose={handleAlertClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Removed Successfully!
          </Alert>
        </Snackbar>
      </Box>

      <Card
        sx={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.alt,
          borderRadius: "0.55rem",
        }}
      >
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color={theme.palette.secondary[200]}
            gutterBottom
          >
            {category}
          </Typography>
          <Typography variant="h5" component="div">
            Name: {name} | Age: {age} | Color: {color} | Weight: {weight}
          </Typography>
          <Typography variant="h6" component="div">
            {gender}
          </Typography>
          <Typography variant="h6" component="div">
            {is_boarded ? (
              <Typography> Boarded </Typography>
            ) : (
              <Typography> Farm Owned </Typography>
            )}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            sx={{
              color: buttonColorState,
            }}
            variant="primary"
            size="medium"
            onClick={() => buttonClickAction()}
          >
            {buttonState}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

const CattleList = () => {
  const { data, isLoading, isSuccess } = useGetAllCattleQuery();
  const [addNewCattle] = useAddNewCattleMutation();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const navigate = useNavigate();

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="Select cattle to add to sale"
        subtitle="List of cattle in the farm."
      />
      <Button
        component="label"
        variant="contained"
        size="large"
        color="success"
        onClick={() => {
          navigate("/addnewcattle");
        }}
        sx={{
          my: "1rem",
          fontSize: "1rem",
          fontWeight: "bold"
        }}
      >
        Create Cattle
      </Button>
      {data || (!isLoading && isSuccess) ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          position={"static"}
          alignItems={"baseline"}
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              gender,
              images,
              color,
              weight,
              age,
              is_boarded,
              category,
              health,
              feed,
              device,
              farm,
            }) => (

              <CattleCard
                key={_id}
                _id={_id}
                name={name}
                gender={gender}
                images={images}
                color={color}
                weight={weight}
                age={age}
                is_boarded={is_boarded}
                category={category}
                health={health}
                feed={feed}
                device={device}
                farm={farm}
              />
            )
          )}
        </Box>
      ) : (
        <div>
          Loading...
        </div>
      )}
    </Box>
  );
};

export default CattleList;
