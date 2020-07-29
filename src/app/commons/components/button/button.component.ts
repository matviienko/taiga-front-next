/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ButtonDisplay } from './button.model';

/**
 * Taiga default button
 *
 * ### Example
 *
 * ```
 *  <button tg-button
 *    [variant]="primary"
 *    [loading]="false"
 *    disabled="disabled"
 *    aria-label="Alternative text for the button"
 *    type="button"
 *    [icon]="'check'" >
 *      Text
 *   </tg-button>
 * ```
 *
 */

/* tslint:disable:component-selector */
@Component({
  selector: '[tg-button]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TgButtonComponent implements OnInit {

  // constructor(
  //   @Attribute('type') public type: ButtonType = 'button'
  // ) {}

  @Input() public variant: ButtonDisplay = 'primary';
  @Input() public loading = false;
  @Input() public icon: string;

  // @HostBinding('attr.disabled') @Input() public disabled = false;
  // @HostBinding('attr.aria-label') @Input() public ariaLabel: string;

  public ngOnInit() {
    console.log(this.loading, this.icon, this.variant);
  }
}