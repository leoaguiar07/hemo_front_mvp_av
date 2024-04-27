/**
 *  Document   : morris-home-data.js
 *  Author     : redstar
 *  Description: Script for morris chart data for home page
 *
 **/
"use strict";
$(function(){
	$('#homeDoctorList').slimScroll({
		height: '352px'
	});
});
$(function(){
	$('#reviewWindow').slimScroll({
		height: '280px'
	});
});

jQuery(document).ready(function() {
	Morris.Line({
        element: 'line_chart',
        data: [{
            period: '19',
            'A+': 35,
            'A-': 45,
            'AB+': 69,
            'AB-': 45,
            'O+': 54,
            'O-': 58
        },{
            period: '20',
            'A+': 33,
            'A-': 67,
            'AB+': 55,
            'AB-': 46,
            'O+': 62,
            'O-': 42
        },{
            period: '21',
            'A+': 44,
            'A-': 53,
            'AB+': 35,
            'AB-': 42,
            'O+': 60,
            'O-': 48
        },{
            period: '22',
            'A+': 35,
            'A-': 67,
            'AB+': 15,
            'AB-': 35,
            'O+': 67,
            'O-': 28
        }, {
            period: '23',
            'A+': 70,
            'A-': 56,
            'AB+': 25,
            'AB-': 42,
            'O+': 52,
            'O-': 35
        }, {
            period: '24',
            'A+': 54,
            'A-': 62,
            'AB+': 42,
            'AB-': 60,
            'O+': 38,
            'O-': 52
        }, {
            period: '25',
            'A+': 62,
            'A-': 48,
            'AB+': 29,
            'AB-': 35,
            'O+': 67,
            'O-': 15
        }
    ],
    xkey: 'period',
    ykeys: ['A+', 'A-', 'AB+', 'AB-','O+','O-'],
    labels: ['A+', 'A-', 'AB+', 'AB-','O+','O-'],
    pointSize: 6,
    fillOpacity: 0,
    pointStrokeColors: ['#222222', '#58D6CF', '#B6D7A8', '#4272B1', '#F37E2B', '#666666'],
    behaveLikeLine: true,
    gridLineColor: '#e0e0e0',
    lineWidth: 2,
    hideHover: 'auto',
    lineColors: ['#222222', '#58D6CF', '#B6D7A8', '#4272B1', '#F37E2B', '#666666'],
    resize: true
    });
	
});
Morris.Area({
	element: "area_line_chart",
	behaveLikeLine: true,
	data: [
	       {w: '2023 Q1', x: 29},
	       {w: '2023 Q2', x: 40},
	       {w: '2023 Q3', x: 55},
	       {w: '2023 Q4', x: 45},
	       {w: '2023 Q5', x: 54}
	       ],
	       xkey: 'w',
	       ykeys: ['x'],
	       labels: ['X'],
	       pointSize: 0,
	       lineWidth: 0,
	       resize: true,
	       fillOpacity: 0.8,
	       behaveLikeLine: true,
	       gridLineColor: '#e0e0e0',
	       hideHover: 'auto',
	       lineColors: ['#6C96D2']
});

Morris.Bar({
	  element: 'bar-example',
	  data: [
	    { y: 'Set/2023', a: 100, b: 90 },
	    { y: 'Out/2023', a: 75,  b: 65 },
	    { y: 'Nov/2023', a: 50,  b: 40 },
	    { y: 'Dez/2023', a: 75,  b: 65 },
	    { y: 'Jan/2024', a: 50,  b: 40 },
	    { y: 'Fev/2024', a: 75,  b: 65 },
	    { y: 'Mar/2024', a: 100, b: 90 }
	  ],
	  xkey: 'y',
	  ykeys: ['a', 'b'],
	  labels: ['Series A', 'Series B'],
	  barColors: ['#4272B1', '#F37E2B']
	});

