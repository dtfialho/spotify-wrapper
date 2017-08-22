import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/search';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');


describe('Search', () => {

  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });

  });

  describe('Generic search', () => {

    it('should receive the correct url to fetch', () => {
      context('passing one type', () => {
        const artists = search('AC/DC', 'artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=artist');

        const albuns = search('AC/DC', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=album');
      });

      context('passing more than one type', () => {
        const artistAndAlbums = search('AC/DC', [ 'artist', 'album' ]);

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=artist,album');
      });
    });

    it('should return the JSON data from the promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('AC/DC', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });

  });

  describe('searchArtists', () => {

    it('should call fetch function', () => {
      const artists = searchArtists('AC/DC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchArtists('AC/DC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=artist');
    });

  });

  describe('searchAlbums', () => {

    it('should call fetch function', () => {
      const artists = searchAlbums('AC/DC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchAlbums('AC/DC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=album');
    });

  });

  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const artists = searchTracks('AC/DC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchTracks('AC/DC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=track');
    });

  });

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {
      const artists = searchPlaylists('AC/DC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct url', () => {
      const artists = searchPlaylists('AC/DC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=AC/DC&type=playlist');
    });

  });

});
