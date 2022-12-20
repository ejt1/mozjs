set(NSPR_SRCS
  src/threads/combined/prulock.c)

add_library(nspr ${NSPR_SRCS})

target_include_directories(nspr
  PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/include/private
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/include)

target_compile_definitions(nspr PRIVATE _NSPR_BUILD_ PUBLIC NO_NSPR_10_SUPPORT)
