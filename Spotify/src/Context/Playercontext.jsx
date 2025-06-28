import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {

    const audioref = useRef();
    const seekbg = useRef();
    const seekbar = useRef();

    const [track, setTrack] = useState(songsData[0]);// this is the audio path of the song 
    const [playerstatus, setPlayerStatus] = useState(false);// this is the song status of music player
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0// this line is used to set the time of the song
        },
        totalTime: {
            second: 0,// this line is send the total time of the song
            minute: 0
        }
    });

    const play = () => {
        if (audioref.current) {
            audioref.current.play();// this play function will play the song and setplayerstatus will be true when the song will played
            setPlayerStatus(true);
        } else {
            console.warn("Audio element not found");
        }
    };



    const pause = () => {
        audioref.current.pause();
        setPlayerStatus(false);// this line is used to stop the music when i press the pause button it will stops the music and the setplayerstatus will become false.
    }

    useEffect(() => {
        const audio = audioref.current;
        if (!audio) return;

        audio.ontimeupdate = () => {
            // Update seek bar width
            if (seekbar.current && audio.duration) {
                const progress = Math.floor((audio.currentTime / audio.duration) * 100);
                seekbar.current.style.width = progress + "%";
            }

            // Update time state
            setTime({
                currentTime: {
                    second: Math.floor(audio.currentTime % 60),
                    minute: Math.floor(audio.currentTime / 60),//  this is used to make music length 
                },
                totalTime: {
                    second: Math.floor(audio.duration % 60),
                    minute: Math.floor(audio.duration / 60),// this will calculate the total duration of the music
                },
            });
        };

        return () => {
            audio.ontimeupdate = null; // cleanup
        };
    }, [audioref, seekbar, setTime]);


    const previous = () => {
        if (track.id > 0) {
            setTrack(songsData[track.id - 1]);// this is used to go back to the previous song
            setPlayerStatus(true);
        }
    };

    const next = () => {
        if (track.id < songsData.length - 1) {
            setTrack(songsData[track.id + 1]);//this function is used to go to the next song 
            setPlayerStatus(true);
        }
    };

    const seeksong = async (e) => {
        audioref.current.currentTime=((e.nativeEvent.offsetX/seekbg.current.offsetWidth)*audioref.current.duration)// this is used to move the song length or speed of the music
    }


    const playwithid = async (id) => {
        await setTrack(songsData[id]);
        await audioref.current.play();
        setPlayerStatus(true);// this line is used to make the songs to play when click the play button any song will play
    }


    const contextvalue = {
        audioref,
        seekbar,
        seekbg,                                          // this all lines are used to manage the duration of the music and also the time taken to the music playing in that time  and also this code is used as a Api to send the suitable song for the allocated position of that music and also this file sends the music for the Albumitem and Displayalbum.
        track, setTrack,
        playerstatus, setPlayerStatus,
        time, setTime,
        play, pause,
        playwithid,
        previous, next, seeksong
    }

    return (
        <PlayerContext.Provider value={contextvalue}>
            {props.children}
        </PlayerContext.Provider>
    )
}

export default PlayerContextProvider;