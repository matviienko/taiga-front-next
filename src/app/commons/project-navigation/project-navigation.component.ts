/**
 * Copyright (c) 2014-2020 Taiga Agile LLC
 *
 * This source code is licensed under the terms of the
 * GNU Affero General Public License found in the LICENSE file in
 * the root directory of this source tree.
 */

import { Component, Input, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Project } from '@/app/api/projects/projects.model';
import { Permissions } from '@/app/api/roles/roles.model';
import { UtilsService } from '@/app/commons/utils/utils-service.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

// TODO:
// ACTIVE
// COLLAPSE
// TESTING

@Component({
  selector: 'tg-project-navigation',
  templateUrl: './project-navigation.component.html',
  styleUrls: ['./project-navigation.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '200px',
      })),
      state('closed', style({
        width: '48px',
      })),
      transition('open => closed', [
        animate('1s'),
      ]),
      transition('closed => open', [
        animate('0.5s'),
      ]),
    ]),
  ],
})
export class ProjectNavigationComponent implements OnInit {
  @Input()
  public project: Project;
  public videoUrl: string;
  public scrumVisible = false;
  @HostBinding('class.collapsed')
  public collapsed = false;

  public ngOnInit() {
    console.log(this.project);
    this.videoUrl = this.videoConferenceUrl();
  }

  get isMenuEpicsEnabled() {
    return this.project.isEpicsActivated && this.project.myPermissions.includes(Permissions.viewEpics);
  }

  get isMenuScrumEnabled() {
    return this.project.isBacklogActivated && this.project.myPermissions.includes(Permissions.viewUserstory);
  }
  get isMenuKanbanEnabled() {
    return this.project.isKanbanActivated && this.project.myPermissions.includes(Permissions.viewUserstory);
  }
  get isMenuIssuesEnabled() {
    return this.project.isIssuesActivated && this.project.myPermissions.includes(Permissions.viewIssues);
  }

  get isMenuWikiEnabled() {
    return this.project.isWikiActivated && this.project.myPermissions.includes(Permissions.viewWikiPages);
  }

  public toggleScrum() {
    this.scrumVisible = !this.scrumVisible;
  }

  public toggleCollapse() {
    console.warn('collapse!');
    this.collapsed = !this.collapsed;
  }

  // TODO: TEST
  private videoConferenceUrl(): string {
    let baseUrl = '';

    if (this.project.videoconferences === 'whereby-com') {
      baseUrl = 'https://whereby.com/';
    } else if (this.project.videoconferences === 'talky') {
      baseUrl = 'https://talky.io/';
    } else if (this.project.videoconferences === 'jitsi') {
      baseUrl = 'https://meet.jit.si/';
    } else if (this.project.videoconferences === 'custom' && this.project.videoconferencesExtraData) {
      return this.project.videoconferencesExtraData;
    }

    let url = '';

    // Add prefix to the chat room name if exist
    if (this.project.videoconferencesExtraData) {
      url = `${this.project.slug}-${UtilsService.slugify(this.project.videoconferencesExtraData)}`;
    } else {
      url = this.project.slug;
    }

    // Some special cases
    if (this.project.videoconferences === 'jitsi') {
      url = url.replace(/-/g, '');
    }

    return baseUrl + url;
  }
}