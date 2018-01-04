import React from 'react'
import { View, Text, NativeModules, StyleSheet } from 'react-native'
import RowItem from '../components/RowItem'
import RowContainer from '../components/RowContainer'
import Loading from '../components/Loading'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class Battery extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'Battery',
    tabBarIcon: () => <Icon name="battery-30" size={25} color="white" />,
  }

  state = { loading: true }

  componentDidMount() {
    let device = NativeModules.RNEasyDeviceInfo
    device
      .getBatteryInfo()
      .then((batteryInfo) => {
        this.batteryInfo = batteryInfo
        this.setState({ loading: false })
      })
      .catch((e) => console.log(e))
  }

  render() {
    if (this.state.loading) {
      return <Loading />
    }

    let batt = this.batteryInfo
    let battPct = batt.batteryPercentage
    let color = '#006400'
    if (battPct < 25) {
      color = '#ca2818'
    } else if (battPct < 50) {
      color = '#d89e25'
    }
    return (
      <RowContainer>
        <View style={s.batt}>
          <Text style={[s.batteryPct, { color: color }]}>{battPct}%</Text>
        </View>
        <View>
          <RowItem title="Battery Health" value={batt.batteryHealth} />
          <RowItem title="Battery Temperature" value={batt.batteryTemperature} />
          <RowItem title="Battery Technology" value={batt.batteryTechnology} />
          <RowItem title="Battery Voltage" value={batt.batteryVoltage} />
          <RowItem title="Battery Present" value={batt.isBatteryPresent} />
          <RowItem title="Device Charging" value={batt.isDeviceCharging} />
          <RowItem title="Charging Source" value={batt.chargingSource} />
        </View>
      </RowContainer>
    )
  }
}

const s = StyleSheet.create({
  batt: {
    alignItems: 'center',
    marginBottom: 20,
  },
  batteryPct: {
    fontSize: 100,
  },
})
