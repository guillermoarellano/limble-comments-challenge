import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { Routes, provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export interface CoreOptions {
  routes: Routes;
}

export function provideCore({ routes }: CoreOptions) {
  return [provideExperimentalZonelessChangeDetection(), provideAnimationsAsync(), provideRouter(routes)];
}
