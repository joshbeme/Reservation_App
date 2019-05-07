/**
 *  @flow
 *  @format
 *
 * */

import React, { Component } from "react";
import type { Node } from "react";
import { View, StyleSheet, Text } from "react-native";
import {
  IconButton,
  Modal,
  TextInput,
  Title,
  Button,
  Portal
} from "react-native-paper";
import { Calendar } from "react-native-calendars";
import { Mutation } from "react-apollo";

type State = {
  name: string,
  hotelName: string,
  arrivalDate: string,
  departureDate: string,
  arrivalCal: boolean,
  departureCal: boolean
};

class CreateReservation extends Component<State> {
  constructor() {
    super();
    this.state = {
      name: "",
      hotelName: "",
      arrivalDate: "",
      departureDate: "",
      arrivalCal: false,
      departureCal: false
    };
    this.arrivalSelect = this.arrivalSelect.bind(this);
    this.departureSelect = this.departureSelect.bind(this);
    this.nameInput = this.nameInput.bind(this);
    this.hotelNameInput = this.hotelNameInput.bind(this);
    this.arrivalInput = this.arrivalInput.bind(this);
    this.departureInput = this.departureInput.bind(this);
  }
  static navigationOptions = {
    header: null
  };
  arrivalSelect(day: {}) {
    this.setState({
      arrivalDate: day.dateString,
      arrivalCal: false,
      departureCal: false

    });
  }
  departureSelect(day: {}) {
    this.setState({
      departureDate: day.dateString,
      arrivalCal: false,
      departureCal: false
    });
  }
  nameInput(name: string) {
    this.setState({ name });
  }

  hotelNameInput(hotelName: string) {
    this.setState({ hotelName });
  }

  arrivalInput() {
    this.setState({ 
        arrivalCal: true,
        departureCal: false
      });
  }

  departureInput() {
    this.setState({ 
        arrivalCal: false,
        departureCal: true
    });
  }

  render() {
    const {
      name,
      hotelName,
      arrivalDate,
      departureDate,
      arrivalCal,
      departureCal
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.close}>
          <IconButton icon="close" size={30} />
        </View>
        <Title style={styles.title}>New Reservation</Title>
        <View style={styles.inputContainer}>
          <View>
            <TextInput
              label="Name"
              onChangeText={this.nameInput}
              value={name}
            />
          </View>
          <View>
            <TextInput
              label="Hotel Name"
              onChangeText={this.hotelNameInput}
              value={hotelName}
            />
          </View>
          <View>
            <Text style={styles.date}>Date</Text>
            <View style={styles.dateInput}>
              <TextInput
                style={{ width: "40%" }}
                label="Start"
                onFocus={this.arrivalInput}
                value={arrivalDate}
                isFocused={arrivalCal}

              />
              <Text style={styles.dash}>-</Text>
              <TextInput
                style={{ width: "40%" }}
                label="End"
                isFocused={departureCal}
                onFocus={this.departureInput}
                value={departureDate}
              />
            </View>
          </View>
          <Button mode="contained">Create</Button>
        </View>
        <Portal>
          <Modal visible={arrivalCal}>
            <Calendar onDayPress={this.arrivalSelect} />
          </Modal>
          <Modal visible={departureCal}>
            <Calendar onDayPress={this.departureSelect} />
          </Modal>
        </Portal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    alignSelf: "center"
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
    marginLeft: 10,
    justifyContent: "space-evenly"
  },
  close: {
    flex: 0,
    alignItems: "flex-end",
    paddingRight: 5
  },
  date: {
    marginLeft: 20,
    fontSize: 20
  },
  dateInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  dash: {
    fontSize: 40
  }
});

export default CreateReservation;
