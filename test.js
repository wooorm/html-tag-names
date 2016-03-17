/**
 * @author Titus Wormer
 * @copyright 2016 Titus Wormer
 * @license MIT
 * @module html-tag-names
 * @fileoverview Test suite for `html-tag-names`.
 */

'use strict';

/* eslint-env node */

/*
 * Module dependencies.
 */

var test = require('tape');
var htmlTagNames = require('./index.js');

/*
 * Tests.
 */

test('htmlTagNames', function (t) {
    t.ok(
        Array.isArray(htmlTagNames),
        'should be an `array`'
    );

    htmlTagNames.forEach(function (tagName) {
        t.equal(
            typeof tagName,
            'string',
            '`' + tagName + '` should be a string'
        );
    });

    t.end();
});
