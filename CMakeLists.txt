cmake_minimum_required(VERSION 3.23)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

project(mozjs)

include(ConfigurePlatform)

add_subdirectory(js)
add_subdirectory(mfbt)

enable_testing()
include(PrepareTest)
add_subdirectory(tests)
