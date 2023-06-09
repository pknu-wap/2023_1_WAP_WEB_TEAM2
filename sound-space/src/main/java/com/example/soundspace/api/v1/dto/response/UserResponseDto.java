package com.example.soundspace.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class UserResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TokenInfo {
        private String grantType;
        private String accessToken;
        private String refreshToken;
        private Long refreshTokenExpirationTime;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class UserInfo {
        private String username;
        private String email;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class UserInfoForSearching {
        private Long id;
        private String username;
    }
}
