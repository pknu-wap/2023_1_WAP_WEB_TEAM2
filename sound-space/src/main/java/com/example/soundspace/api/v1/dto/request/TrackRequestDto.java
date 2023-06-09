package com.example.soundspace.api.v1.dto.request;

import lombok.Getter;
import lombok.Setter;

public class TrackRequestDto {

    @Getter
    @Setter
    public static class Update {
        private Long musicId;
        private String trackTitle;
        private String artistName;
        private String albumImageUrl;
        private String lyrics;
    }
}
