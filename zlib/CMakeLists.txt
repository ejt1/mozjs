set(ZLIB_SRCS
  src/adler32.c
  src/compress.c
  src/crc32.c
  src/deflate.c
  src/gzclose.c
  src/gzlib.c
  src/gzread.c
  src/gzwrite.c
  src/infback.c
  src/inffast.c
  src/inflate.c
  src/inftrees.c
  src/trees.c
  src/uncompr.c
  src/zutil.c)

add_library(zlib ${ZLIB_SRCS})

target_link_libraries(zlib PRIVATE mfbt)

target_include_directories(zlib
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/src)
