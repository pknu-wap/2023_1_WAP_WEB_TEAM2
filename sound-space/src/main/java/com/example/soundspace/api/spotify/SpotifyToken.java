package com.example.soundspace.api.spotify;

import com.wrapper.spotify.SpotifyApi;
import com.wrapper.spotify.model_objects.credentials.ClientCredentials;
import com.wrapper.spotify.requests.authorization.client_credentials.ClientCredentialsRequest;

import java.util.concurrent.CancellationException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.CompletionException;


public class SpotifyToken {

    private static String clientId;
    private static String clientSecret;

    private static SpotifyApi spotifyApi;
    private static ClientCredentialsRequest clientCredentialsRequest;

    public static String accessToken() {
        try {
            final CompletableFuture<ClientCredentials> clientCredentialsFuture = clientCredentialsRequest.executeAsync();

            // Thread free to do other tasks...

            // Example Only. Never block in production code.
            final ClientCredentials clientCredentials = clientCredentialsFuture.join();

            // Set access token for further "spotifyApi" object usage
            spotifyApi.setAccessToken(clientCredentials.getAccessToken());

            System.out.println("Expires in: " + clientCredentials.getExpiresIn());

            return spotifyApi.getAccessToken();
        } catch (CompletionException e) {
            System.out.println("Error: " + e.getCause().getMessage());
        } catch (CancellationException e) {
            System.out.println("Async operation cancelled.");
        }
        return "error";
    }

    public static void setClientId(String clientId) {
        SpotifyToken.clientId = clientId;
    }

    public static void setClientSecret(String clientSecret) {
        SpotifyToken.clientSecret = clientSecret;
    }

    public static void setSpotifyApi(SpotifyApi spotifyApi) {
        SpotifyToken.spotifyApi = spotifyApi;
    }

    public static void setClientCredentialsRequest(ClientCredentialsRequest clientCredentialsRequest) {
        SpotifyToken.clientCredentialsRequest = clientCredentialsRequest;
    }
}
