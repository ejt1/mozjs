set(MFBT_SRCS
  src/decimal/Decimal.cpp

  src/double-conversion/bignum.cc
  src/double-conversion/bignum-dtoa.cc
  src/double-conversion/cached-powers.cc
  src/double-conversion/diy-fp.cc
  src/double-conversion/double-conversion.cc
  src/double-conversion/fast-dtoa.cc
  src/double-conversion/fixed-dtoa.cc
  src/double-conversion/strtod.cc
  
  #src/mozilla/Compression.cpp
  src/mozilla/FloatingPoint.cpp
  src/mozilla/HashFunctions.cpp
  src/mozilla/JSONWriter.cpp
  src/mozilla/Poison.cpp
  src/mozilla/SHA1.cpp
  src/mozilla/TaggedAnonymousMemory.cpp
  src/mozilla/unused.cpp)

add_library(mfbt ${MFBT_SRCS})

target_include_directories(mfbt
  PUBLIC
    ${CMAKE_CURRENT_SOURCE_DIR}/src/decimal
    ${CMAKE_CURRENT_SOURCE_DIR}/src/double-conversion
    ${CMAKE_CURRENT_SOURCE_DIR}/src)

target_compile_definitions(mfbt PUBLIC -DIMPL_MFBT)

install(TARGETS mfbt
  DESTINATION ${CMAKE_INSTALL_PREFIX}/lib)

set(MFBT_PUBLIC_HDRS
  src/mozilla/Alignment.h
  src/mozilla/AllocPolicy.h
  src/mozilla/AlreadyAddRefed.h
  src/mozilla/Array.h
  src/mozilla/ArrayUtils.h
  src/mozilla/Assertions.h
  src/mozilla/Atomics.h
  src/mozilla/Attributes.h
  src/mozilla/BinarySearch.h
  src/mozilla/BloomFilter.h
  src/mozilla/Casting.h
  src/mozilla/ChaosMode.h
  src/mozilla/Char16.h
  src/mozilla/CheckedInt.h
  src/mozilla/Compiler.h
  src/mozilla/Compression.h
  src/mozilla/Constants.h
  src/mozilla/DebugOnly.h
  src/mozilla/Endian.h
  src/mozilla/EnumeratedArray.h
  src/mozilla/EnumSet.h
  src/mozilla/FloatingPoint.h
  src/mozilla/GuardObjects.h
  src/mozilla/HashFunctions.h
  src/mozilla/IntegerPrintfMacros.h
  src/mozilla/IntegerRange.h
  src/mozilla/IntegerTypeTraits.h
  src/mozilla/IteratorTraits.h
  src/mozilla/JSONWriter.h
  src/mozilla/Likely.h
  src/mozilla/LinkedList.h
  src/mozilla/MacroArgs.h
  src/mozilla/MacroForEach.h
  src/mozilla/MathAlgorithms.h
  src/mozilla/Maybe.h
  src/mozilla/MaybeOneof.h
  src/mozilla/MemoryChecking.h
  src/mozilla/MemoryReporting.h
  src/mozilla/Move.h
  src/mozilla/NullPtr.h
  src/mozilla/NumericLimits.h
  src/mozilla/Opaque.h
  src/mozilla/Pair.h
  src/mozilla/PodOperations.h
  src/mozilla/Poison.h
  src/mozilla/Range.h
  src/mozilla/RangedPtr.h
  src/mozilla/ReentrancyGuard.h
  src/mozilla/RefCountType.h
  src/mozilla/RefPtr.h
  src/mozilla/ReverseIterator.h
  src/mozilla/RollingMean.h
  src/mozilla/Scoped.h
  src/mozilla/SizePrintfMacros.h
  src/mozilla/SHA1.h
  src/mozilla/SplayTree.h
  src/mozilla/TaggedAnonymousMemory.h
  src/mozilla/TemplateLib.h
  src/mozilla/ThreadLocal.h
  src/mozilla/ToString.h
  src/mozilla/TypedEnumBits.h
  src/mozilla/Types.h
  src/mozilla/TypeTraits.h
  src/mozilla/UniquePtr.h
  src/mozilla/Vector.h
  src/mozilla/Util.h
  src/mozilla/WeakPtr.h
  src/mozilla/unused.h)

if(WIN32)
  list(APPEND MFBT_PUBLIC_HDRS
    src/mozilla/WindowsVersion.h)
else()
  list(APPEND MFBT_PUBLIC_HDRS
    src/mozilla/LinuxSignal.h)
endif()

install(FILES ${MFBT_PUBLIC_HDRS}
  DESTINATION ${CMAKE_INSTALL_PREFIX}/include/mozilla)

install(FILES src/decimal/Decimal.h
  DESTINATION ${CMAKE_INSTALL_PREFIX}/include/mozilla/decimal)

install(FILES
  src/double-conversion/double-conversion.h
  src/double-conversion/utils.h
  DESTINATION ${CMAKE_INSTALL_PREFIX}/include/mozilla/double-conversion)
