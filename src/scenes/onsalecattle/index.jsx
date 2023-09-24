import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Header from "components/Header";
import { useGetGeographyQuery, useGetOnSaleCattleQuery } from "state/api";
import Questions from "components/Questions";

const OnSaleCattle = ({
  _id,
  title,
  description,
  image,
  price,
  category,
  location,
  contact,
  cattle_info,
  questions,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonName, setButtonName] = useState("View More")

  const handleButtonName = () => {
    if (isExpanded){
      setButtonName("View Less")
    }
    else {
      setButtonName("View More") 
    }
  } 
  
  useEffect(() => {
    handleButtonName()}
    , [isExpanded]);

  return (
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
          {title}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          Rs: {Number(price).toFixed(2)}
        </Typography>

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {buttonName}
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>
            Questions: {questions.map(
              ({
              description,
              subject,

            }) => ( <Questions
              subject= {subject}
              description= {description}
            />
            )
            
            )}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const AllOnSaleCattle = () => {
  const { data, isLoading } = useGetOnSaleCattleQuery();
  console.log(data);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ON SALE Cattle" subtitle="See your list of cattle in farm." />
      {data || !isLoading ? (
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
              title,
              description,
              location,
              contact,
              category,
              cattle_info,
              price,
              questions,
            }) => (
              <OnSaleCattle
                key={_id}
                _id={_id}
                title={title}
                description={description}
                category={category}
                cattle_info={cattle_info}
                contact={contact}
                questions={questions}
                price={price}
                location={location}

              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default AllOnSaleCattle;