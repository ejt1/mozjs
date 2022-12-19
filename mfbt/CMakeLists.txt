set(MFBT_SRCS
  src/double-conversion/bignum.cc
  src/double-conversion/bignum-dtoa.cc
  src/double-conversion/cached-powers.cc
  src/double-conversion/diy-fp.cc
  src/double-conversion/double-conversion.cc
  src/double-conversion/fast-dtoa.cc
  src/double-conversion/fixed-dtoa.cc
  src/double-conversion/strtod.cc

  src/mozilla/HashFunctions.cpp
  src/mozilla/SHA1.cpp)

add_library(mfbt ${MFBT_SRCS})

target_include_directories(mfbt
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/src/double-conversion
    ${CMAKE_CURRENT_SOURCE_DIR}/src)

target_compile_definitions(mfbt PUBLIC -DIMPL_MFBT)
