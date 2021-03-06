/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Environment } from './environment.model';

import config from '../configs/config.json';

export const environment: Environment = {
  production: true,
  configLocal: config,
};
