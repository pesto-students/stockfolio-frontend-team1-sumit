import React from "react";
import "./index.css";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const News = ({ news }) => {
  return (
    <div className="all__news">
      <div className="slide_track">
        {news.map((news, index) => {
          return (
            <div className="slide-card" key={index}>
              <Card sx={{ minWidth: 300 }} className="card">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {news.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {news.author}
                  </Typography>
                  <Typography variant="body2">{news.description}</Typography>
                </CardContent>
                <CardActions>
                  <Typography variant="p" color="blue">
                    {"Source:"}
                    {news.source}
                  </Typography>
                  <Typography variant="p" color="blue">
                    {"Published On:"}
                    {news.published_at}
                  </Typography>
                </CardActions>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;
