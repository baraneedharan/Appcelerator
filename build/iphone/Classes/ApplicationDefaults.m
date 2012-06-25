/**
* Appcelerator Titanium Mobile
* This is generated code. Do not modify. Your changes *will* be lost.
* Generated code is Copyright (c) 2009-2011 by Appcelerator, Inc.
* All Rights Reserved.
*/
#import <Foundation/Foundation.h>
#import "TiUtils.h"
#import "ApplicationDefaults.h"
 
@implementation ApplicationDefaults
  
+ (NSMutableDictionary*) copyDefaults
{
    NSMutableDictionary * _property = [[NSMutableDictionary alloc] init];

    [_property setObject:[NSNumber numberWithBool:[TiUtils boolValue:@"false"]] forKey:@"ti.android.debug"];
    [_property setObject:[TiUtils stringValue:@"134793934930"] forKey:@"ti.facebook.appid"];
    [_property setObject:[TiUtils stringValue:@"0ZnKXkWA2dIAu2EM-OV4ZD2lJY3sEWE5TSgjJNg"] forKey:@"ti.android.google.map.api.key.development"];
    [_property setObject:[TiUtils stringValue:@"GET_ME_FROM_GOOGLE"] forKey:@"ti.android.google.map.api.key.production"];

    return _property;
}
@end
