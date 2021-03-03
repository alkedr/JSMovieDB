import tornado.ioloop
from tornado import web
import psycopg2

_movies = []


class MoviesHandler(web.RequestHandler):
    def post(self):
        _movies.append(self.request.body.decode('utf-8'))

    def get(self):
        self.write({
            'movies': _movies
        })

    def delete(self):
        _movies.remove(self.request.body.decode('utf-8'))

def make_app():
    return tornado.web.Application([
        (r"/api/movies", MoviesHandler),
        (r"/static/(.*)", web.StaticFileHandler, {"path": "/home/alkedr/programming/JSMovieDB/"}),
    ])


if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()
