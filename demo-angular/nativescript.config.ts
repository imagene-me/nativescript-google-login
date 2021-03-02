import { NativeScriptConfig } from '@nativescript/core';

export default {
  id: 'me.imagene.mylifeDiabetesTest',
  appResourcesPath: 'App_Resources',
  android: {
    v8Flags: '--expose_gc',
    markingMode: 'none'
  }
} as NativeScriptConfig;
