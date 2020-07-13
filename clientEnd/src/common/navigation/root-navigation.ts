import React, { createRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createRef<NavigationContainerRef>();
export const navigate = (name: string, params?: Object) => navigationRef.current?.navigate(name, params);
export const goBack = () => navigationRef.current?.goBack();
