import { Text, StyleSheet, View } from "react-native";
import { Component, default as React, useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
const styles = StyleSheet.create({
	spinnerTextStyle: {
		color: '#FFF'
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF'
	}
});
export default () => {
	return (
		<View style={styles.container}>
			<Spinner
				visible={true}
				textContent={''}
				color={'#3C038C'}
				textStyle={styles.spinnerTextStyle}
			/>
		</View>
	)
}