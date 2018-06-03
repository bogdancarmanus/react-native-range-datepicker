'use strict'
import React from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableWithoutFeedback,
	Dimensions
} from 'react-native';
import moment from 'moment';

const DEVICE_WIDTH = Dimensions.get('window').width;

export default class Day extends React.Component {
	constructor(props) {
		super(props);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.day.type == this.props.day.type)
			return false;

		return true;
	}

	render() {
		let {day, dayProps} = this.props;
		let { dayWidth } = dayProps;
		let dayStyle = {backgroundColor : 'transparent', position: 'relative'};
		let textDayStyle = {color: 'black'};

		switch(day.type){
			case "single" : 
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderRadius: dayWidth }
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "first" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderBottomLeftRadius: dayWidth, borderTopLeftRadius: dayWidth }
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "last" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor, borderBottomRightRadius: dayWidth, borderTopRightRadius: dayWidth }
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "between" :
				dayStyle = {backgroundColor : dayProps.selectedBackgroundColor}
				textDayStyle = {color: dayProps.selectedTextColor};
				break;
			case "disabled" :
			case "blockout" :
				textDayStyle = {color: '#ccc'};
			default: break;
		}

		if(day.date){
			if(day.type == 'disabled')
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{...dayStyle, height: dayWidth, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", width: dayWidth, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							{day.date == moment().format("YYYYMMDD") ? (<View style={{position: 'absolute', top:0, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: Math.floor(DEVICE_WIDTH / 17), fontWeight: 'bold', color: '#ccc', textAlign: 'center'}}>__</Text></View>) : null}
						</View>
					</TouchableWithoutFeedback>
				);
			else if(day.type == 'blockout') {
				const strikeTop = Math.floor(DEVICE_WIDTH / -22);
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
						<View style={{...dayStyle, height: dayWidth, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", width: dayWidth, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							<View style={{position: 'absolute', top: strikeTop, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: Math.floor(DEVICE_WIDTH / 17), color: '#ccc', textAlign: 'center'}}>__</Text></View>
						</View>
					</TouchableWithoutFeedback>
				);
			}
			else
				return (
					<TouchableWithoutFeedback activeOpacity={1} style={dayStyle} onPress={() => this.props.onSelectDate(moment(day.date, 'YYYYMMDD'))}>
						<View style={{...dayStyle, height: dayWidth, justifyContent: 'center'}}>
							<Text style={{...textDayStyle, textAlign: "center", width: dayWidth, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{moment(day.date, 'YYYYMMDD').date()}</Text>
							{day.date == moment().format("YYYYMMDD") ? (<View style={{position: 'absolute', top:0, bottom:0, left:0, right: 0, justifyContent: 'center', backgroundColor: 'transparent'}}><Text style={{fontSize: Math.floor(DEVICE_WIDTH / 17), fontWeight: 'bold', color: dayProps.selectedBackgroundColor, textAlign: 'center'}}>__</Text></View>) : null}
						</View>
					</TouchableWithoutFeedback>
				);
		}
		else
			return (
				<TouchableWithoutFeedback activeOpacity={1} style={dayStyle}>
					<View style={{...dayStyle, height: dayWidth, justifyContent: 'center'}}>
						<Text style={{ ...textDayStyle, textAlign: "center", width: dayWidth, backgroundColor: 'transparent', fontSize: Math.floor(DEVICE_WIDTH / 26)}}>{null}</Text>
					</View>
				</TouchableWithoutFeedback>
			);
	}
}
