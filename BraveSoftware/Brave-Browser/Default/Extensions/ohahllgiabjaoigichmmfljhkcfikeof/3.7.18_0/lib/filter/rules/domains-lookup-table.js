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

(function (abu, api) {

    'use strict';

    /**
     * Special lookup table, which improves basic rules search speed by domain.
     */
    var DomainsLookupTable = function (rules) {

        this.lookupTable = Object.create(null);

        if (rules) {
            for (var i = 0; i < rules.length; i++) {
                this.addRule(rules[i]);
            }
        }
    };

    DomainsLookupTable.prototype = {

        /**
         * Adds specified rule to the lookup table (if it is possible).
         * If rule has no domain restriction, this method returns false.
         *
         * @param rule Url filter rule
         * @return boolean true if rule was added. Otherwise - false.
         */
        addRule: function (rule) {
            if (!rule.hasPermittedDomains()) {
                // No permitted domains, we can't do anything
                return false;
            }

            var permittedDomains = rule.getPermittedDomains();
            for (var i = 0; i < permittedDomains.length; i++) {
                var domainName = permittedDomains[i];
                var rules = this.lookupTable[domainName];
                if (!rules) {
                    rules = [];
                    this.lookupTable[domainName] = rules;
                }

                rules.push(rule);
            }

            return true;
        },

        /**
         * Removes specified rule from the lookup table
         *
         * @param rule Rule to remove
         */
        removeRule: function (rule) {

            if (!rule.hasPermittedDomains()) {
                // No permitted domains, we can't do anything
                return;
            }

            var permittedDomains = rule.getPermittedDomains();
            for (var i = 0; i < permittedDomains.length; i++) {
                var domainName = permittedDomains[i];
                var rules = this.lookupTable[domainName];
                if (rules) {
                    abu.utils.collections.removeRule(rules, rule);
                    if (rules.length === 0) {
                        delete this.lookupTable[domainName];
                    }
                }
            }
        },

        /**
         * Clears lookup table
         */
        clearRules: function () {
            this.lookupTable = Object.create(null);
        },

        /**
         * Searches for filter rules restricted to the specified domain
         *
         * @param domainName Domain name
         * @return List of filter rules or null if nothing found
         */
        lookupRules: function (domainName) {

            if (!domainName) {
                return null;
            }

            var parts = domainName.split('.');
            if (parts.length === 0) {
                return null;
            }

            // Resulting list
            var urlFilterRules = null;

            // Iterate over all sub-domains
            var host = parts[parts.length - 1];
            for (var i = parts.length - 2; i >= 0; i--) {
                host = parts[i] + "." + host;
                var rules = this.lookupTable[host];
                if (rules && rules.length > 0) {
                    if (urlFilterRules === null) {
                        // Lazy initialization of the resulting list
                        urlFilterRules = [];
                    }
                    urlFilterRules = urlFilterRules.concat(rules);
                }
            }

            return urlFilterRules;
        },

        /**
         * @returns {Array} rules in lookup table
         */
        getRules: function () {
            var result = [];
            for (var r in this.lookupTable) { 
                var value = this.lookupTable[r];
                if (value) {
                    if (abu.utils.collections.isArray(value)) {
                        result = result.concat(value);
                    } else {
                        result.push(value);
                    }
                }
            }

            return abu.utils.collections.removeDuplicates(result);
        }
    };

    api.DomainsLookupTable = DomainsLookupTable;

})(abu, abu.rules);

