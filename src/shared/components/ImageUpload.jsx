import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";

const ImageUpload = ({ id, onInput, placeholder }) => {
    const imgRef = useRef();
    const [file, setFile] = useState(null);
    const [isValid, setIsValid] = useState(false);
    const [preview, setPreview] = useState(placeholder);

    const changeImgHandler = (e) => {
        let tempIsValid;
        let imgFile;

        if (e.target.files && e.target.files.length === 1) {
            imgFile = e.target.files[0];

            setFile(imgFile);
            setIsValid(true);
            tempIsValid = true;
        } else {
            setIsValid(false);
            tempIsValid = false;
        }

        onInput(id, imgFile, tempIsValid);
    };

    const chooseImageHandler = () => {
        imgRef.current.click();
    };

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPreview(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }, [file]);

    return (
        <div className="center">
            <input
                id={id}
                ref={imgRef}
                type="file"
                className="hidden"
                accept=".jpg, .jpeg, .png"
                onChange={changeImgHandler}
            />
            <div id="img-container" className="center flex-col">
                <div id="img-preview">
                    {preview && (
                        <img
                            src={preview}
                            className="w-[100%] h-48 rounded-md mb-3 object-cover"
                            alt="Preview"
                        />
                    )}
                    {!preview && <p>Please choose an image</p>}
                </div>
                <Button
                    type="button"
                    variant="info"
                    onClick={chooseImageHandler}
                >
                    Choose Photo
                </Button>
            </div>
        </div>
    );
};

export default ImageUpload;
