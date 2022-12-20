cmake_minimum_required(VERSION 3.23)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

# TODO: Make it an option to chose /MD or /MT
set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")

project(mozjs)

include(ConfigurePlatform)

###############################################################################
## Begin definitions
# TODO: Just temporarily define these to successfully compile and move later.
add_definitions(-DSTATIC_JS_API)
add_definitions(-DJS_DEFAULT_JITREPORT_GRANULARITY=3)
add_definitions(-DWIN32)
if(CMAKE_SIZEOF_VOID_P MATCHES 8)
  add_definitions(-D_AMD64_)
else()
  add_definitions(-D_X86_)
endif()
add_definitions(-DMOZILLA_VERSION="24.8.1")
add_definitions(-D__STDC_FORMAT_MACROS)
add_definitions(-D_CRT_RAND_S)
## End definitions
###############################################################################

add_subdirectory(js)
add_subdirectory(mfbt)

enable_testing()
include(PrepareTest)
add_subdirectory(tests)
