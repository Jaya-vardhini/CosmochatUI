import React, { useEffect, useState } from "react";
import api from "../../api/sessions";
import { Grid, CircularProgress, Typography, Link } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import ActivityStyles from "../../styles/activity";
import AllStyles from "../../styles/home";
import ChartHistory from "../../components/chatHistory";

const Activity = () => {
    const [loading, setLoading] = useState(true);
    const [sessionDates, setSessionDates] =  useState([]);
    const [sessionChatLengths, setSessionChatLengths] = useState([])
    const [session, setSessions] = useState([]);

    useEffect(() => {
      const fetchSessions = async () => {
        try {
          const response = await api.get("/sessions");
          setSessions(response.data.reverse());
          setSessionDates([
            ...Array.from(response.data, (data) => data.data.split(",")[0]),
          ]);
          setSessionChatLengths([
            ...Array.from(response.data, (data) => data.chats.length),
          ]);
          setLoading(false);
        }  catch (err) {
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            } else {
              console.log(err);
            }
        }
      };
      fetchSessions();  
    },[]);

    return (
      <Grid container {...ActivityStyles.activityBody}>
        <Grid container item {...ActivityStyles.titleOutline}>
            <Typography {...ActivityStyles.titlesOutLine}>Your Statistics</Typography>
      </Grid>
      <Grid container item>
        <Typography {...ActivityStyles.Description}>
          Graph of the conversation you had with ReX this year.
        </Typography>
      </Grid>
      <Grid container item>
         {loading ? (
           <CircularProgress />
         ) : (
            <BarChart
             xAxis={[{ scaleType: "band", data: [...sessiondates] }]}
             series={[{ data: [...sessionChatLengths] }]}
             width={500}
             height={300}
            />
         )}
         </Grid>
         <Grid container item {...AllStyles.endedChatsTitle}>
            <Grid {...AllStyles.endedChats}>Details Chat Activity</Grid>
            <Grid>
              <Link {...AllStyles.seeAllLink} href="/activityDetails">
                See All
              </Link>
            </Grid>
          </Grid>
          <Grid>
             {loading ? (
                <CircularProgress />
             ) : (
                sessions.map((session, i) =>
                  session.isSessionEnded && i< 4 ? (
                    <ChartHistory
                      key={session.is}
                      id={session.id}
                      date={session.date}
                      session
                      lasttext={
                        session.chats.length
                          ? session.chats[session.chats.length - 1].Rex[
                             session.chats[session.chats.length - 1].RexReX.length - 1
                          ]
                          :""
                      }
                      session ended={session.isSessionEnded}
                    />
                 ))
             )}
          </Grid>
        </Grid>
      );
    };

export default Activity;
    