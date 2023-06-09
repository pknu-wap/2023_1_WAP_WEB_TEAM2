package com.example.soundspace.api.v1.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

public class TrackResponseDto {

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TrackSummary {
        private Integer trackIndex;
        private String albumImageUrl;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TrackSummaryForUpdating {
        private Integer trackIndex;
        private String trackTitle;
        private String artistName;
    }

    @Builder
    @Getter
    @AllArgsConstructor
    public static class TrackInfo {
        private Long musicId;
        private String trackTitle;
        private String artistName;
        private String albumImageUrl;
        private String lyrics;
        private boolean isBookmarked;
    }
}
