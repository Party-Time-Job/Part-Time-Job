import React, { ChangeEvent, ForwardedRef } from 'react';

export interface Option {
  value: string;
}

export interface Options {
  options: Option[];
}

export interface SelectUiInterface {
  type: 'search' | 'filter';
  title?: string;
  isOpen: boolean;
  ref: ForwardedRef<HTMLDivElement>;
  dropDown: () => void;
  onClick: (value: string) => void;
  children: React.ReactNode;
}

export interface SelectDropdownUiInterface {
  type: 'search' | 'filter';
  title?: 'string';
  isOpen: boolean;
  isRequired?: boolean;
  selected: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SelectInterface {
  defaultValue?: string;
  options: Option[];
  onClick?: (value: string) => void;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
}
