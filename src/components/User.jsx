import React, { useContext } from "react";
import { Icon, Modal, Card } from "web3uikit";
import { AirbnbContext } from "../context/AirbnbContext";
import "./user.css";
var console = require("console-browserify");

function User() {
  const { isVisible, setVisible, userRentals } = useContext(AirbnbContext);

  return (
    <>
      <div onClick={() => setVisible(true)}>
        <Icon fill="#000000" size={24} svg="user" />
      </div>

      <Modal
        className="user_container"
        onCloseButtonPressed={() => setVisible(false)}
        hasFooter={false}
        title="Your Stays"
        isVisible={isVisible}
      >
        <div className="stay_lists_container">
          {userRentals &&
            userRentals.map((e) => {
              return (
                <div style={{ width: "200px" }}>
                  <Card
                    isDisabled
                    title={e.attributes.city}
                    description={`${e.attributes.datesBooked[0]} for ${e.attributes.datesBooked.length} Days`}
                  >
                    <div>
                      <img width="180px" src={e.attributes.imgUrl} />
                    </div>
                  </Card>
                </div>
              );
            })}
        </div>
      </Modal>
    </>
  );
}

export default User;
