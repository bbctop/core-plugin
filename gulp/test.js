const gulp = require("gulp");
const less = require("gulp-less");
const fs = require('fs');
const args = require('yargs').argv;

// There is 5 modules
const modules = ['backend','editor','cms','editor','system']

// Each module may have some assets need to compile in ['widgets','reportwidgets','formwidgets','behaviors']
const widgets = ['widgets','reportwidgets','formwidgets','behaviors']

const less_task = []

// Check if exists folder less add it to less task

modules.forEach(module => {
  
})