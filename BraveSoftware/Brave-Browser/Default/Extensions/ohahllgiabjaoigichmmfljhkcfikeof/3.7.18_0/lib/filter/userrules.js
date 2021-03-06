/**
 * This file is part of AdBlocker Ultimate Browser Extension
 *
 * AdBlocker Ultimate Browser Extension is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * AdBlocker Ultimate Browser Extension is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with AdBlocker Ultimate Browser Extension.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Class for manage user rules
 */
abu.userrules = (function (abu) {

    'use strict';

    /**
     * Wraps access to getter. AntiBannerService hasn't been defined yet.
     * @returns {*}
     */
    function getAntiBannerService() {
        return abu.antiBannerService;
    }

    /**
     * User rules collection
     * @type {Array}
     */
    var userRules = [];

    /**
     * Gets user rules
     */
    var getRules = function () {
        return userRules;
    };

    /**
     * Set user rules. Calls on filter initialization, when we have already read rules from storage.
     * @param rules
     */
    var setRules = function (rules) {
        userRules = rules;
    };

    /**
     * Adds list of rules to the user filter
     *
     * @param rulesText List of rules to add
     */
    var addRules = function (rulesText) {
        var rules = getAntiBannerService().addFilterRules(abu.utils.filters.USER_FILTER_ID, rulesText);
        for (var i = 0; i < rules.length; i++) {
            userRules.push(rules[i].ruleText);
        }
        return rules;
    };

    /**
     * Removes all user's custom rules
     */
    var clearRules = function () {
        userRules = [];
        getAntiBannerService().clearFilterRules(abu.utils.filters.USER_FILTER_ID);
    };

    /**
     * Removes user's custom rule
     *
     * @param ruleText Rule text
     */
    var removeRule = function (ruleText) {
        abu.utils.collections.removeAll(userRules, ruleText);
        getAntiBannerService().removeFilterRule(abu.utils.filters.USER_FILTER_ID, ruleText);
    };

    var unWhiteListFrame = function (frameInfo) {
        if (frameInfo.frameRule) {
            if (frameInfo.frameRule.filterId === abu.utils.filters.WHITE_LIST_FILTER_ID) {
                abu.whitelist.unWhiteListUrl(frameInfo.url);
            } else {
                removeRule(frameInfo.frameRule.ruleText);
            }
        }
    };

    return {
        getRules: getRules,
        setRules: setRules,
        addRules: addRules,
        clearRules: clearRules,
        removeRule: removeRule,
        //TODO: fix
        unWhiteListFrame: unWhiteListFrame
    };

})(abu);