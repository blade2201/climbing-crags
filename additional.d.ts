import { NextPage } from 'next';
import { AppProps } from 'next/app';
import React, { ReactElement, ReactNode } from 'react';

export type CommentsType = {
  _id: string;
  title: string;
  comment: string;
  rating: number;
  path?: string;
  user?: string;
  comment_rating: number;
  id?: string;
  votes?: {
    [key: string]: number;
  };
};

export type RoutesType = {
  _id?: string;
  grade_id: number;
  sector_id?: number;
  crag_id: number;
  name: string;
  rating: number;
  id: string;
  sector?: string;
  crag?: string;
  images?: [
    {
      src: string;
      id: string;
    }
  ];
  comments?: CommentsType[];
  avgRating?: number;
};

export type SectorsType = {
  sector: string;
  _id: string;
  crag: string;
  country: string;
  crag_id: number;
  images: any[];
  routes: RoutesType[];
  sector: string;
  sector_id: number;
};

export type CragsType = {
  country: string;
  crag: string;
  images: any[];
  sectors: SectorsType[];
  _id: string;
};

export type GradesType = {
  id: number;
  fra_routes: string;
  usa_routes: string;
};

export type ReactNodeWithProps = React.ReactNode & {
  props: {
    grades?: GradesType[];
    grade?: GradesType;
    crags?: CragsType[];
    crag?: CragsType;
    sectors?: SectorsType[];
    sector?: SectorsType;
  };
};
