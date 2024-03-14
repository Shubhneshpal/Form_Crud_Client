import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../Form/style.css";
import { Link, useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Employe = () => {
  // chatApp is here ✍️ 👩‍🚒
  const [username, setUsername] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newmessage, setNewmessage] = useState("");

  // chatApp is here ✍️ 👩‍🚒
  const navigate = useNavigate();
  const [getData, setgetData] = useState([]);

  const toComponentB = (data) => {
    navigate("/edit/form", { state: { data } });
  };
  // Get Api
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/forms/get-form-data"
      );
      if (response.ok) {
        const jsondata = await response.json();
        setgetData(jsondata);
      } else {
        console.log("error fetching data");
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // DELETE API
  const handleDelete = async (id) => {
    try {
      const userConfirom = window.confirm("Are you sure you want to delete?");
      if (userConfirom) {
        const response = await fetch(
          `http://localhost:5000/api/forms/delete-form-data/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          console.log("Data deleted successfully");
          // You can update the state or refetch the data if needed
          // setGetdata((prevData) => prevData.filter(item => item._id !== id));
          fetchData();
        } else {
          console.error("Failed to delete data:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const showPdf = (filename) => {
    window.open(
      `http://localhost:5000/uploads/${filename}`,
      "_blank",
      "noreferrer"
    );
    // setPdfFile(`http://localhost:5000/files/${pdf}`)
  };

  // chatApp is here ✍️ 👩‍🚒

  useEffect(() => {
    socket.on("received message", (message) => {
      setMessages([...messages, message]);
      console.log(messages);
    });
  }, [messages, socket]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const messageData = {
      message: newmessage,
      name: username,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };

    if (!newmessage == "") {
      socket.emit("send-message", messageData);
      setNewmessage("");
    } else {
      alert("Message cannot be empoty");
    }
  };

  // chatApp is here ✍️ 👩‍🚒
  return (
    <>
      <div className="addEmploye">
        <Link to={"/form"}>
          <button className="btn01">addEmploye</button>
        </Link>
      </div>
      <div className="getDataInTable ">
        <Table responsive>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>MobileNO</th>
              <th>Adress</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>

          {getData.map((data, index) => {
            console.log("getData", data);
            return (
              <tbody>
                <tr key={index}>
                  <td>{data.Fname}</td>
                  <td>{data.Lname}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.MobileNo}</td>
                  <td>{data.adress}</td>
                  <td>
                    {data.file.name}
                    <button
                      className="btn01 btn00"
                      onClick={() => showPdf(data.file.filename)}
                    >
                      Veiw
                    </button>
                  </td>
                  <td className="buttons">
                    <button
                      className="btn01 btn02"
                      onClick={() => handleDelete(data._id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn01"
                      onClick={() => {
                        toComponentB(data);
                      }}
                    >
                      Eddite
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </div>

      {/* chat app is here */}
      <div className="chatApp">
        {chatActive ? (
          <div className="chatingHere">
            <div className="openPage">
              <h1>Squad chat</h1>
              <div className="main-getdata">
                {messages.map((data, index) => {
                  return (
                    <div
                      className={`${
                        username === data.name ? "usermargin" : ""
                      }`}
                      key={index}
                    >
                      <div className="imgOrText">
                        <h3>{data.name.charAt(0).toUpperCase()}</h3>
                        <div className="msg">
                          <h5>{data.message}</h5>
                          <p>{data.time}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="userChatStart">
                <form className="chat_withName" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Type your message..."
                    id=""
                    value={newmessage}
                    onChange={(e) => setNewmessage(e.target.value)}
                  />
                  <button type="submit">Send</button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat_withName">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              type="submit"
              onClick={() => !username == "" && setChatActive(true)}
            >
              Start chat
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Employe;
