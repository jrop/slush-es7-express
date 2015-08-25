LESS=$(wildcard src/client/css/*.less) $(wildcard src/client/css/**/*.less)
CSS=$(patsubst src/client/css/%,public/build/css/%,$(patsubst %.less,%.css,$(LESS)))

SERVER_JS=$(wildcard src/server/*.js) $(wildcard src/server/**/*.js)
BUILT_SERVER_JS=$(patsubst src/server/%,build/%,$(SERVER_JS))

CLIENT_JS=$(wildcard src/client/js/*.js) $(wildcard src/client/js/**/*.js)
BUILT_CLIENT_JS=$(patsubst src/client/js/%,public/build/js/%,$(CLIENT_JS))

all: $(CSS) $(BUILT_SERVER_JS) $(BUILT_CLIENT_JS)
	@echo Build complete

public/build/css/%.css: src/client/css/%.less
	@echo Compiling $<
	@./node_modules/.bin/lessc --source-map-map-inline --autoprefix $< $@

public/build/js/%.js: src/client/js/%.js
	@echo Transpiling $<
	@mkdir -p $(dir $@)
	@./node_modules/.bin/browserify $< -t [ babelify --optional runtime ] --debug > $@

build/%.js: src/server/%.js
	@echo Transpiling $<
	@mkdir -p $(dir $@)
	@./node_modules/.bin/babel --optional runtime -o $@ $<

clean:
	@rm -rf ./build/
	@rm -rf ./public/build/
