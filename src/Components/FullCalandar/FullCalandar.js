import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../Config//Firebase";

import { setCalendarData } from "../../Store/Slices/CalendarSlice";
import { getData } from "../../Config/Services";
import { Button, Card, Input, RoundedInput } from "../Shared";
import { AddData, updateNestedData } from "../../Config/Services";
import Calendar from "rc-year-calendar";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { SketchPicker } from "react-color";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./FullCalandar.css";

function FullCalandar() {
  // Šis Hook atgriež atsauci uz nosūtīšanas funkciju no Redux
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const { events } = useSelector((state) => state.calendar);
  const [showModal, setShowModal] = useState(false);
  const [textBox, setTextBox] = useState(EditorState.createEmpty());
  const [currentEvent, setCurrentEvent] = useState({
    color: "",
    id: "",
    text: "",
    startDate: "",
    endDate: "",
  });

  // Uzstāda lietotāja kalendāra datus
  useEffect(() => {
    (async () => {
      const { events } = await getData("events", user?.uid);
      dispatch(setCalendarData(formatObject(events)));
    })();
  }, [user?.uid, dispatch]);

  // handle update input
  const handleChange = (e) => {
    setCurrentEvent({
      ...currentEvent,
      text: draftToHtml(convertToRaw(textBox.getCurrentContent())),
    });
  };

  // Funkcija kas saglabā, vai atjaunina jaunas piezīmes(events)
  const saveCurrentEvent = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (currentEvent?.id === undefined) {
      // Pievieno jaunu piezīmi(event)

      currentEvent.id = Math.floor(Math.random() * 26) + 97; // 97-123 ir Ascii a-z elementi
      if (events.length === 0) {
        AddData("events", user?.uid, { events: events.concat([currentEvent]) });
      } else if (events.length >= 0) {
        updateNestedData("events", user?.uid, "events", currentEvent);
      }
      dispatch(setCalendarData(events.concat([currentEvent])));
      setCurrentEvent({
        color: "",
        id: "",
        heading: "",
        text: "",
        startDate: "",
        endDate: "",
      });
    } else {
      // Atjauno piezīmes (events)
      var ds = events;
      var index = ds?.findIndex((evt) => evt.id === currentEvent.id);
      let newarr = [];
      for (let i = 0; i < ds.length; i++) {
        if (i === index) {
          newarr.push(currentEvent);
        } else {
          newarr.push(ds[i]);
        }
      }

      console.log(newarr);

      AddData("events", user?.uid, { events: newarr });
      dispatch(setCalendarData(newarr));
      setCurrentEvent({
        color: "",
        id: "",
        heading: "",
        text: "",
        startDate: "",
        endDate: "",
      });
    }

    setShowModal(false);
    setLoading(false);
  };
  // Atjauno piezīmes jauno krāsu
  function handleColorChange(color) {
    setCurrentEvent({
      ...currentEvent,
      color,
    });
  }

  return (
    <div className="full-calender-container">
      {showModal && (
        <Card setShowChangeAvatar={setShowModal}>
          <form className="calandar-form" onSubmit={saveCurrentEvent}>
            <br />
            <div
              className="selectedColor"
              style={{ background: currentEvent.color }}
            ></div>

            <div className="colorContainer">
              <div
                onClick={() => handleColorChange("#e74c3c")}
                className="red color"
              ></div>
              <div
                onClick={() => handleColorChange("#3498db")}
                className="blue color"
              ></div>
              <div
                onClick={() => handleColorChange("#2ecc71")}
                className="green color"
              ></div>
              <div
                onClick={() => handleColorChange("#f39c12")}
                className="yellow color"
              ></div>
            </div>

            <Editor
              editorState={textBox}
              wrapperClassName={`rich-editor demo-wrapper richTextContainer`}
              editorClassName={`demo-editor richTextEditor`}
              onEditorStateChange={(editorState) => {
                setTextBox(editorState);
                handleChange();
              }}
              placeholder="Type Here"
              toolbar={{
                options: ["inline", "list"],
                inline: {
                  options: ["bold", "italic", "underline"],
                },
                list: {
                  options: ["unordered", "ordered"],
                },
              }}
            />

            <Button
              type="submit"
              text={
                loading
                  ? "Please Wait ..."
                  : currentEvent?.id
                  ? "Update"
                  : "Add"
              }
            />
          </form>
        </Card>
      )}

      <Calendar
        enableRangeSelection={true}
        onRangeSelected={(e) => {
          if (e?.events[0]?.id) {
            setCurrentEvent(e.events[0]);

            // setTextBox(htmlToDraftConvert(e.events[0].text));
          } else {
            setTextBox(EditorState.createEmpty());
            setCurrentEvent({
              startDate: e.date || e.startDate,
              endDate: e.date || e.endDate,
              color: "#5DB1C3",
            });
          }
          setShowModal(true);
        }}
        dataSource={events}
        style="background"
        onDayClick={(e) => {
          if (e?.events[0]?.id) {
            setCurrentEvent(e.events[0]);
            console.log("e.events[0]", e.events[0]);
            setTextBox(htmlToDraftConvert(e.events[0].text));
          } else {
            setCurrentEvent({
              startDate: e.date || e.startDate,
              endDate: e.date || e.endDate,
              color: "#5DB1C3",
            });
          }

          setShowModal(true);
        }}
      />
    </div>
  );
}

// Funkcija kas pārvērš html uz draft formātu

const htmlToDraftConvert = (htmlContent) => {
  const blocksFromHtml = htmlToDraft(htmlContent);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const contentState = ContentState.createFromBlockArray(
    contentBlocks,
    entityMap
  );
  return EditorState.createWithContent(contentState);
};

// Funkcija kas pārvērš masīvu par objektu

const formatObject = (payload) => {
  let newar = [];
  for (let i = 0; i < payload.length; i++) {
    const obj = {
      ...payload[i],
      endDate: payload[i].endDate.toDate(),
      startDate: payload[i].startDate.toDate(),
    };
    newar.push(obj);
  }
  return newar;
};
export default FullCalandar;
