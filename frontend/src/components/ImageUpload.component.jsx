import React from "react";

import { useImageStore } from '../states/ImageStore.states'

import CardActionArea from "@material-ui/core/CardActionArea";
import Avatar from '@material-ui/core/Avatar';

import Fab from "@material-ui/core/Fab";
import blue from "@material-ui/core/colors/blue";

import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    input: {
        display: "none"
    },
    button: {
        color: blue[900],
        height: theme.spacing(15),
        width: theme.spacing(15),
    },
    media: {
        height: theme.spacing(15),
        width: theme.spacing(15),
    },
    icon: {
        height: theme.spacing(7),
        width: theme.spacing(7),
    },
    image: {
        height: theme.spacing(15),
        width: theme.spacing(15),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

function ImageUploadIcon() {
    const classes = useStyles()

    const profileImage = useImageStore(state => state.image)
    const setProfileImage = useImageStore(state => state.setImage)
    const resetProfileImage = useImageStore(state => state.removeImage)

    const [state, setState] = React.useState({
        mainState: "initial", // initial, search, gallery, uploaded
        imageUploaded: 0,
    });

    const handleUploadClick = (event) => {

        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setProfileImage(reader.result)
            setState({
                mainState: "uploaded",
                imageUploaded: 1
            });
        }
    };

    const renderInitialState = () => {
        return (
            <React.Fragment>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    type="file"
                    onChange={handleUploadClick}
                />
                <label htmlFor="contained-button-file" >
                    <Fab component="span" className={classes.button}>
                        <AddPhotoAlternateIcon className={classes.icon} />
                    </Fab>
                </label>
            </React.Fragment>
        );
    }

    const renderUploadedState = () => {
        return (
            <React.Fragment>
                <CardActionArea className={classes.image} onClick={imageResetHandler}>
                    <Avatar variant="circular" className={classes.media}>
                        <img
                            className={classes.media}
                            alt=''
                            src={profileImage}
                        />
                    </Avatar>
                </CardActionArea>
            </React.Fragment>
        );
    }

    const imageResetHandler = event => {
        console.log("Click!");
        resetProfileImage();
        setState({
            mainState: "initial",
            imageUploaded: 0
        });
    };

    return (
        <React.Fragment>
            {(state.mainState === "initial" && renderInitialState()) ||
                (state.mainState === "uploaded" && renderUploadedState())}
        </React.Fragment>
    );

}

export default ImageUploadIcon;
