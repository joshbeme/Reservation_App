/**
 *  @flow
 *  @format
 *
 * */

import React, { Component } from "react";
import type { Node } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { Button, Card, Divider, Title } from "react-native-paper";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_RESERVATIONS = gql`
  query {
    reservations(orderBy: arrivalDate_DESC) {
      id
      name
      hotelName
      arrivalDate
      departureDate
    }
  }
`;

type State = {};
type NavigationOptions = {
  headerRight: Node,
  headerTitle: string
};
class Reservations extends Component<State> {
  static navigationOptions: NavigationOptions = {
    headerTitle: "Reservations",
    headerRight: <Button icon="add">Add</Button>,
    
  };

  renderData(response: {
    loading: boolean,
    error: any,
    data: any
  }): Node[] | Node {
    const { loading, error, data } = response;

    if (error) {
      return <Text>Error</Text>;
    }
    if (loading) {
      return (
        <View style={styles.loading}>
          <Text>Loading...</Text>
        </View>
      );
    } else {
      const reservationKeys: string[] = Object.keys(data && data.reservations);
      type Data = {
        id: string,
        name: string,
        hotelName: string,
        arrivalDate: string,
        departureDate: string
      };

      //More scrubbing than usually
      const dataScrub: Data[] = reservationKeys
        .filter(
          (allKeys: string, i: number): boolean => {
            //filter meaningless data
            const {
              name,
              hotelName,
              arrivalDate,
              departureDate
            } = data.reservations[allKeys];
            const dateRegex = /[a-z]/ig
            if (
              name === "" ||
              hotelName === "" ||
              arrivalDate === "" ||
              departureDate === ""
            ) {
              return false;
            } else if(dateRegex.test(arrivalDate) || dateRegex.test(departureDate)){
              return false
            } else if (
              (arrivalDate.includes("-") ||
              arrivalDate.includes("/")) && 
              (departureDate.includes("-") ||
              departureDate.includes("/"))
            ) {
              return true;
            }
            
            else {
              return false;
            }
          }
        )
        .map(
          (goodKeys: string, i: number): Data => {
            //map meaningful data
            const dataObj: Data = data.reservations[goodKeys];

            return {
              name: dataObj.name,
              hotelName: dataObj.hotelName,
              arrivalDate: dataObj.arrivalDate,
              departureDate: dataObj.departureDate,
              id: dataObj.id
            };
          }
        );

      return dataScrub.map(
        (reservation: Data, i: number): Node => {
          if(i > 30){

          }
          else{return (
            <View key={reservation.id}>
              <Card>
                <Card.Content>
                  <Title>{reservation.hotelName}</Title>
                  <Text>Name: {reservation.name}</Text>
                  <Text>
                    {reservation.arrivalDate} - {reservation.departureDate}
                  </Text>
                </Card.Content>
              </Card>

              <Divider />
            </View>
          )}
        }
      )
    }
  }

  render() {
    return (
      <View style={styles.container}>
       <ScrollView>
          <Query query={GET_RESERVATIONS}>{this.renderData}</Query></ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    top:0,
    alignItems: "center",
    height: Math.round(Dimensions.get("window").height),
    width: Math.round(Dimensions.get("window").width)
  }
});

export default Reservations;
