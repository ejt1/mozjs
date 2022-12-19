# TODO: Just temporarily define these to successfully compile and move later.
add_definitions(-DSTATIC_JS_API)
add_definitions(-DJS_DEFAULT_JITREPORT_GRANULARITY=3)
add_definitions(-DWIN32)
add_definitions(-D_AMD64_)


function(jsapi_prepare_tests TEST_LIBRARY)
  cmake_parse_arguments(jsapi_prepare_tests "" "" "" ${ARGN})
  set(_test_srcs "${jsapi_prepare_tests_UNPARSED_ARGUMENTS}")
  if(NOT _test_srcs)
    message(SEND_ERROR "Error: jsapi_prepare_tests() called without any source files")
    return()
  endif()

  foreach(_file ${_test_srcs})
    add_executable(${_file} ${_file}.cpp tests.cpp)
    target_link_libraries(${_file} PRIVATE ${TEST_LIBRARY})
    add_test(NAME ${_file} COMMAND ${_file})
  endforeach()
endfunction()

set(JSAPI_TEST_SRCS
  tests.cpp
  selfTest.cpp
  testAddPropertyPropcache.cpp
  testArgumentsObject.cpp
  testArrayBuffer.cpp
  testBindCallable.cpp
  testBug604087.cpp
  testCallNonGenericMethodOnProxy.cpp
  testChromeBuffer.cpp
  testClassGetter.cpp
  testCloneScript.cpp
  testConservativeGC.cpp
  testContexts.cpp
  testCustomIterator.cpp
  testDebugger.cpp
  testDeepFreeze.cpp
  testDefineGetterSetterNonEnumerable.cpp
  testDefineProperty.cpp
  testEnclosingFunction.cpp
  testErrorCopying.cpp
  testExternalStrings.cpp
  testFindSCCs.cpp
  testFuncCallback.cpp
  testFunctionProperties.cpp
  testGCFinalizeCallback.cpp
  testGCOutOfMemory.cpp
  testGetPropertyDefault.cpp
  testHashTable.cpp
  testIndexToString.cpp
  testIntern.cpp
  testIntString.cpp
  testIntTypesABI.cpp
  testJSEvaluateScript.cpp
  testLookup.cpp
  testLooselyEqual.cpp
  testNewObject.cpp
  testObjectEmulatingUndefined.cpp
  testOOM.cpp
  testOps.cpp
  testOriginPrincipals.cpp
  testParseJSON.cpp
  testProfileStrings.cpp
  testPropCache.cpp
  testRegExp.cpp
  testResolveRecursion.cpp
  testSameValue.cpp
  testScriptInfo.cpp
  testScriptObject.cpp
  testSetProperty.cpp
  testSourcePolicy.cpp
  testStringBuffer.cpp
  testTrap.cpp
  testTypedArrays.cpp
  testUTF8.cpp
  testVersion.cpp
  testXDR.cpp)

add_executable(jsapi-tests ${JSAPI_TEST_SRCS})
target_link_libraries(jsapi-tests PRIVATE js)
add_test(NAME jsapi COMMAND jsapi-tests)
