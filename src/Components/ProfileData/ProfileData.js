import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowUp } from "react-icons/ai";
import { Button, Card, RoundedInput } from "../Shared";
import { updateUser, sendPasswordReset } from "../../Config/Services";
import { setUser } from "../../Store/Slices/UserSlice";
import ProfileCard from "../Shared/ProfileCard/ProfileCard";
import { storage } from "../../Config/Firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import "./ProfileData.css";

function ProfileData() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    weight: "",
    height: "",
    avatarUrl: "",
    month: "",
    date: "",
    year: "",
  });
  const [changedData, setChangedData] = useState({});
  const [showChangeAvatar, setShowChangeAvatar] = useState(false);
  const [progress, setProgress] = useState(null);

  const [image, setImage] = useState("");
  const [img, setImg] = useState("");

  // Lietotāja datu pievienošana
  useEffect(() => {
    const { date, month, year } = miliToDate(user?.dob);
    setUserData({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      gender: user?.gender,
      weight: user?.weight,
      height: user?.height,
      avatarUrl: user?.avatarUrl,
      month,
      year,
      date,
    });
    setImage(user?.avatarUrl);

    return () => {
      setUserData({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        weight: "",
        height: "",
        avatarUrl: "",
        month: "",
        date: "",
        year: "",
      });
      setChangedData({});
    };
  }, []);

  // Funkcija kas maina lietotāja dzimumu
  const handleGenderChange = () => {
    if (userData.gender === "Male") {
      setUserData({
        ...userData,
        gender: "Female",
      });
      setChangedData({
        ...changedData,
        gender: "Female",
      });
    } else if (userData.gender === "Female") {
      setUserData({
        ...userData,
        gender: "Male",
      });

      setChangedData({
        ...changedData,
        gender: "Male",
      });
    }
  };

  // Funkcija, kas nodrošina maiņas ievades laukā
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name === "date") {
      const res = getDateInMiliSec(
        `${userData?.month}/${e.target.value}/${userData?.year}`
      );

      setChangedData({
        ...changedData,
        dob: res,
      });
    } else if (e.target.name === "month") {
      const res = getDateInMiliSec(
        `${e.target.value}/${userData?.date}/${userData?.year}`
      );

      setChangedData({
        ...changedData,
        dob: res,
      });
    } else if (e.target.name === "year") {
      const res = getDateInMiliSec(
        `${userData?.month}/${userData?.date}/${e.target.value}`
      );

      setChangedData({
        ...changedData,
        dob: res,
      });
    } else {
      setChangedData({
        ...changedData,
        [e.target.name]: e.target.value,
      });
    }
  };
  // Funkcija kas nodrošina profila datu maiņu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (Object.keys(changedData).length > 0) {
        setLoading(true);
        const res = await updateUser("users", user?.uid, changedData);
        dispatch(
          setUser({
            ...user,
            ...res,
          })
        );

        setLoading(false);
      } else {
        console.log("nothing exists");
        setLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // Funkcija kas nodrošina profila bildes maiņu
  const formHandler = async (e) => {
    e.preventDefault();
    uploadFiles(img, user?.uid);
  };

  // Bildes augšupielāde uz Storage
  const uploadFiles = (file, uid) => {
    if (!file) {
      alert("Please Select Image First");
      return;
    }
    setImageLoading(true);
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            updateUser("users", uid, { avatarUrl: downloadURL }).then((res) => {
              dispatch(
                setUser({
                  ...user,
                  avatarUrl: res?.avatarUrl,
                })
              );
              setImage(res?.avatarUrl);
              setImageLoading(false);
              setShowChangeAvatar(false);
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    );
  };

  const changeImg = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div className="profile-data-container">
      <h1>Profile</h1>
      <div className="flex profile-container">
        {showChangeAvatar && (
          <Card setShowChangeAvatar={setShowChangeAvatar}>
            <form className="cardinner" onSubmit={formHandler}>
              <label className="custom-file-upload">
                <input
                  onChange={(e) => {
                    changeImg(e);
                  }}
                  accept="image/*"
                  type="file"
                />
                <div htmlFor="file-upload" className="fileupload">
                  <AiOutlineArrowUp />
                </div>
                <p className="imageName">{img ? img?.name : "Upload Image"}</p>
              </label>
              <i className="fa fa-arrow-up"></i>
              <Button
                text={
                  imageLoading
                    ? progress
                      ? progress + "%"
                      : "Please wait.."
                    : "Change Image"
                }
                type="submit"
              />
            </form>
          </Card>
        )}
        <div className="profile-1">
          <ProfileCard>
            <div className="flex card-data">
              <div
                style={{ backgroundImage: `url(${image})` }}
                className="user-avatar"
              ></div>
              <div className="change-avatar">
                <Button
                  isTransparent={true}
                  handleClick={() => {
                    setShowChangeAvatar(true);
                  }}
                  text={"Change Avatar"}
                />
              </div>
              <p
                className="change-pass"
                onClick={() => {
                  sendPasswordReset(user?.email);
                }}
              >
                Change Password
              </p>
            </div>
          </ProfileCard>
        </div>
        <div className="profile-2"></div>
        <ProfileCard>
          <div className="flex profile-inputs">
            <div className="flex profile-input">
              <label>First Name</label>
              <RoundedInput
                isLarge={true}
                name="firstName"
                onChangeHandler={handleChange}
                value={userData?.firstName}
              />
            </div>
            <div className="flex profile-input">
              <label>Last Name</label>
              <RoundedInput
                isLarge={true}
                name="lastName"
                onChangeHandler={handleChange}
                value={userData?.lastName}
              />
            </div>
          </div>

          <div className="flex profile-input">
            <label>Email</label>
            <RoundedInput
              isLarge={true}
              name="email"
              onChangeHandler={handleChange}
              value={userData?.email}
              disable={true}
            />
          </div>

          <div className="flex profile-input">
            <label>Birth Date</label>
            <div className="flex dob-input">
              <RoundedInput
                small={true}
                name="date"
                onChangeHandler={handleChange}
                value={userData?.date}
              />
              <RoundedInput
                small={true}
                name="month"
                onChangeHandler={handleChange}
                value={userData?.month}
              />
              <RoundedInput
                small={true}
                name="year"
                onChangeHandler={handleChange}
                value={userData?.year}
              />
            </div>
          </div>

          <div className="flex last-container">
            <div>
              <label>Gender</label>
              <br />
              <div className="genderr flex">
                <div
                  className={`genderr-item ${
                    userData.gender === "Male" && "selectedd-item"
                  }`}
                  onClick={handleGenderChange}
                >
                  Male
                </div>
                <div
                  className={`genderr-item ${
                    userData.gender === "Female" && "selectedd-item"
                  }`}
                  onClick={handleGenderChange}
                >
                  Female
                </div>
              </div>
            </div>
            <Button
              handleClick={handleSubmit}
              isTransparent={true}
              text={loading ? "Please Wait ..." : "Save Changes"}
            />
          </div>
        </ProfileCard>
      </div>
    </div>
  );
}
// Funkcija kas pārvērš milisekundes datuma formātā
const miliToDate = (mili) => {
  const date = new Date(mili);
  return {
    date: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

// Funkcija kas pārvērš datumu milisekundēs lai glabātu datu bāzē
const getDateInMiliSec = (payload) => {
  console.log(payload);
  const date = new Date(payload);
  const miliSec = date.getTime();
  return miliSec;
};

export default ProfileData;
