cmake_minimum_required(VERSION 3.23)

list(APPEND CMAKE_MODULE_PATH "${CMAKE_CURRENT_SOURCE_DIR}/cmake")

# TODO: Make it an option to chose /MD or /MT
set(CMAKE_MSVC_RUNTIME_LIBRARY "MultiThreaded$<$<CONFIG:Debug>:Debug>")

set(CMAKE_C_STANDARD 99)
set(CMAKE_C_STANDARD_REQUIRED TRUE)

project(mozjs)

include(ConfigurePlatform)

# Disable all warnings (ff38 has like 20k+)
string(REGEX REPLACE "/W[0-4] " "" CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS}")
string(REGEX REPLACE "/W[0-4]$" "" CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS}")
string(REGEX REPLACE "/W[0-4] " "" CMAKE_C_FLAGS "${CMAKE_C_FLAGS}")
string(REGEX REPLACE "/W[0-4]$" "" CMAKE_C_FLAGS "${CMAKE_C_FLAGS}")

###############################################################################
## Begin definitions
# TODO: Just temporarily define these to successfully compile and move later.
add_definitions(-DSTATIC_JS_API)
add_definitions(-DJS_DEFAULT_JITREPORT_GRANULARITY=3)
add_definitions(-DWIN32)
option(ENABLE_ION "Enable ION" ON)
if(CMAKE_SIZEOF_VOID_P MATCHES 8)
  add_definitions(-DJS_PUNBOX64)
  add_definitions(-DJS_CODEGEN_X64)
  add_definitions(-DJS_CPU_X64)
  add_definitions(-D_AMD64_)
else()
  add_definitions(-DJS_NUNBOX32)
  add_definitions(-DJS_CODEGEN_X86)
  add_definitions(-DJS_CPU_X86)
  add_definitions(-D_X86_)
endif()
add_definitions(-DMOZILLA_VERSION="24.8.1")
add_definitions(-D__STDC_FORMAT_MACROS)
add_definitions(-D_CRT_RAND_S)
if(NOT NDEBUG)
  add_definitions(-DDEBUG)
  add_definitions(-DJS_DEBUG)
endif()
## End definitions
###############################################################################

add_subdirectory(js)
add_subdirectory(mfbt)
add_subdirectory(nspr)
add_subdirectory(zlib)

enable_testing()
include(PrepareTest)
add_subdirectory(tests)
