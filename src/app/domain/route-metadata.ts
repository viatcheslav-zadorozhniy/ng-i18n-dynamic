import { MetaDefinition } from '@angular/platform-browser';
import { ResolveFn, Route } from '@angular/router';

export interface RouteMetadata {
  tags: MetaDefinition[];
}

export const RouteMetadataKey = Symbol('RouteMetadata');

export interface RouteWithMetadata extends Route {
  title?: ResolveFn<string>; // Use `ResolveFn` instead of a string to recalculate on locale change.
  children?: RouteWithMetadata[];
  [RouteMetadataKey]?: () => RouteMetadata;
}
