(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
;
;
;
function connect(param) {
    var addMessageListener = param.addMessageListener, sendMessage = param.sendMessage, _param_onUpdateError = param.onUpdateError, onUpdateError = _param_onUpdateError === void 0 ? console.error : _param_onUpdateError;
    addMessageListener(function(msg) {
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(var i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    var queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: function(param) {
            var _param = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(param, 2), chunkPath = _param[0], callback = _param[1];
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = queued[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], callback = _step_value[1];
                subscribeToChunkUpdate(chunkPath, sendMessage, callback);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
}
var updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
        type: 'turbopack-subscribe'
    }, resource));
    return function() {
        sendJSON(sendMessage, (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
            type: 'turbopack-unsubscribe'
        }, resource));
    };
}
function handleSocketConnected(sendMessage) {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = updateCallbackSets.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var key = _step.value;
            subscribeToUpdates(sendMessage, JSON.parse(key));
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}
// we aggregate all pending updates until the issues are resolved
var chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    var key = resourceKey(msg.resource);
    var aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunkListsWithPendingUpdates.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var msg = _step.value;
            triggerUpdate(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    var chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    var merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            var update = updateA.merged[0];
            for(var i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(var i1 = 0; i1 < updateB.merged.length; i1++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i1]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks: chunks,
        merged: merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    var entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    var chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries: entries,
        chunks: chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, entriesA, entriesB);
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    var chunks = {};
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = Object.entries(chunksA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), chunkPath = _step_value[0], chunkUpdateA = _step_value[1];
            var chunkUpdateB = chunksB[chunkPath];
            if (chunkUpdateB != null) {
                var mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
                if (mergedUpdate != null) {
                    chunks[chunkPath] = mergedUpdate;
                }
            } else {
                chunks[chunkPath] = chunkUpdateA;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
    try {
        for(var _iterator1 = Object.entries(chunksB)[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
            var _step_value1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step1.value, 2), chunkPath1 = _step_value1[0], chunkUpdateB1 = _step_value1[1];
            if (chunks[chunkPath1] == null) {
                chunks[chunkPath1] = chunkUpdateB1;
            }
        }
    } catch (err) {
        _didIteratorError1 = true;
        _iteratorError1 = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                _iterator1.return();
            }
        } finally{
            if (_didIteratorError1) {
                throw _iteratorError1;
            }
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        var _updateA_modules, _updateB_modules;
        var added = [];
        var deleted = [];
        var deletedModules = new Set((_updateA_modules = updateA.modules) !== null && _updateA_modules !== void 0 ? _updateA_modules : []);
        var addedModules = new Set((_updateB_modules = updateB.modules) !== null && _updateB_modules !== void 0 ? _updateB_modules : []);
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = addedModules[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var moduleId = _step.value;
                if (!deletedModules.has(moduleId)) {
                    added.push(moduleId);
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
        var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
        try {
            for(var _iterator1 = deletedModules[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                var moduleId1 = _step1.value;
                if (!addedModules.has(moduleId1)) {
                    deleted.push(moduleId1);
                }
            }
        } catch (err) {
            _didIteratorError1 = true;
            _iteratorError1 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                }
            } finally{
                if (_didIteratorError1) {
                    throw _iteratorError1;
                }
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added: added,
            deleted: deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        var _updateA_added, _updateB_added, _updateA_deleted, _updateB_deleted;
        var added1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_added = updateA.added) !== null && _updateA_added !== void 0 ? _updateA_added : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added = updateB.added) !== null && _updateB_added !== void 0 ? _updateB_added : [])));
        var deleted1 = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_deleted = updateA.deleted) !== null && _updateA_deleted !== void 0 ? _updateA_deleted : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_deleted = updateB.deleted) !== null && _updateB_deleted !== void 0 ? _updateB_deleted : [])));
        if (updateB.added != null) {
            var _iteratorNormalCompletion2 = true, _didIteratorError2 = false, _iteratorError2 = undefined;
            try {
                for(var _iterator2 = updateB.added[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true){
                    var moduleId2 = _step2.value;
                    deleted1.delete(moduleId2);
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                        _iterator2.return();
                    }
                } finally{
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
        if (updateB.deleted != null) {
            var _iteratorNormalCompletion3 = true, _didIteratorError3 = false, _iteratorError3 = undefined;
            try {
                for(var _iterator3 = updateB.deleted[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true){
                    var moduleId3 = _step3.value;
                    added1.delete(moduleId3);
                }
            } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
                        _iterator3.return();
                    }
                } finally{
                    if (_didIteratorError3) {
                        throw _iteratorError3;
                    }
                }
            }
        }
        return {
            type: 'partial',
            added: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(added1),
            deleted: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(deleted1)
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        var _updateA_modules1, _updateB_added1, _updateB_deleted1;
        var modules = new Set((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateA_modules1 = updateA.modules) !== null && _updateA_modules1 !== void 0 ? _updateA_modules1 : []).concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((_updateB_added1 = updateB.added) !== null && _updateB_added1 !== void 0 ? _updateB_added1 : [])));
        var _iteratorNormalCompletion4 = true, _didIteratorError4 = false, _iteratorError4 = undefined;
        try {
            for(var _iterator4 = ((_updateB_deleted1 = updateB.deleted) !== null && _updateB_deleted1 !== void 0 ? _updateB_deleted1 : [])[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true){
                var moduleId4 = _step4.value;
                modules.delete(moduleId4);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
                    _iterator4.return();
                }
            } finally{
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
        return {
            type: 'added',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules)
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        var _updateB_modules1;
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        var modules1 = new Set((_updateB_modules1 = updateB.modules) !== null && _updateB_modules1 !== void 0 ? _updateB_modules1 : []);
        if (updateA.added != null) {
            var _iteratorNormalCompletion5 = true, _didIteratorError5 = false, _iteratorError5 = undefined;
            try {
                for(var _iterator5 = updateA.added[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true){
                    var moduleId5 = _step5.value;
                    modules1.delete(moduleId5);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
                        _iterator5.return();
                    }
                } finally{
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }
        }
        return {
            type: 'deleted',
            modules: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(modules1)
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error("Invariant: ".concat(message));
}
var CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    var aI = list.indexOf(a) + 1 || list.length;
    var bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
var chunksWithIssues = new Map();
function emitIssues() {
    var issues = [];
    var deduplicationSet = new Set();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = chunksWithIssues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var _step_value = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(_step.value, 2), _ = _step_value[0], chunkIssues = _step_value[1];
            var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = undefined;
            try {
                for(var _iterator1 = chunkIssues[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true){
                    var chunkIssue = _step1.value;
                    if (deduplicationSet.has(chunkIssue.formatted)) continue;
                    issues.push(chunkIssue);
                    deduplicationSet.add(chunkIssue.formatted);
                }
            } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
            } finally{
                try {
                    if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                        _iterator1.return();
                    }
                } finally{
                    if (_didIteratorError1) {
                        throw _iteratorError1;
                    }
                }
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    var key = resourceKey(msg.resource);
    var hasCriticalIssues = false;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = msg.issues[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var issue = _step.value;
            if (CRITICAL.includes(issue.severity)) {
                hasCriticalIssues = true;
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
var SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
var CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort(function(a, b) {
        var first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
var hooks = {
    beforeRefresh: function() {},
    refresh: function() {},
    buildOk: function() {},
    issues: function(_issues) {}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            var runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    var key = resourceKey(resource);
    var callbackSet;
    var existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return function() {
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    var key = resourceKey(msg.resource);
    var callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = callbackSet.callbacks[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var callback = _step.value;
            callback(msg);
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/components/shared/TopNav.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>TopNav
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
// ── TopNav — Cutting Corners Gems ────────────────────────────
// Absolutely positioned so it overlays the hero section.
// Transitions from transparent to solid dark on scroll.
// Mobile: hamburger drawer.
// Desktop: horizontal links.
// Auth-aware: shows "Account" if session exists, "Login" if not.
// ─────────────────────────────────────────────────────────────
var NAV_LINKS = [
    {
        label: 'Shop',
        href: '/shop'
    },
    {
        label: 'Portfolio',
        href: '/portfolio'
    }
];
var css = "\n@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&family=Oranienbaum&display=swap');\n\n.tnav {\n  position: fixed;\n  top: 0; left: 0; right: 0;\n  z-index: 100;\n  height: 56px;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 28px;\n  transition: background 350ms ease, border-color 350ms ease, backdrop-filter 350ms ease;\n  border-bottom: 0.5px solid transparent;\n}\n.tnav.scrolled {\n  background: rgba(5,5,5,0.92);\n  backdrop-filter: blur(12px);\n  -webkit-backdrop-filter: blur(12px);\n  border-bottom-color: rgba(255,255,255,0.07);\n}\n.tnav-brand {\n  font-family: 'Oranienbaum', Georgia, serif;\n  font-size: 17px;\n  font-weight: 400;\n  color: #FAFAFA;\n  text-decoration: none;\n  letter-spacing: 0.04em;\n  white-space: nowrap;\n  transition: color 200ms ease;\n}\n.tnav-brand:hover { color: #d4af37; }\n.tnav-links {\n  display: flex;\n  align-items: center;\n  gap: 32px;\n}\n.tnav-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.6);\n  text-decoration: none;\n  transition: color 200ms ease;\n  position: relative;\n}\n.tnav-link::after {\n  content: '';\n  position: absolute;\n  bottom: -3px; left: 0; right: 100%;\n  height: 0.5px;\n  background: #d4af37;\n  transition: right 220ms ease;\n}\n.tnav-link:hover { color: #FAFAFA; }\n.tnav-link:hover::after { right: 0; }\n.tnav-auth {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 10px;\n  font-weight: 500;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: #d4af37;\n  text-decoration: none;\n  border: 0.5px solid rgba(212,175,55,0.45);\n  padding: 6px 14px;\n  transition: all 200ms ease;\n}\n.tnav-auth:hover {\n  background: rgba(212,175,55,0.08);\n  border-color: rgba(212,175,55,0.8);\n  color: #e5c84a;\n}\n.tnav-burger {\n  display: none;\n  flex-direction: column;\n  justify-content: center;\n  gap: 5px;\n  width: 36px;\n  height: 36px;\n  background: none;\n  border: 0.5px solid rgba(255,255,255,0.15);\n  cursor: pointer;\n  padding: 8px;\n  transition: border-color 200ms ease;\n}\n.tnav-burger:hover { border-color: rgba(212,175,55,0.5); }\n.tnav-burger .bar {\n  width: 100%;\n  height: 1px;\n  background: rgba(255,255,255,0.75);\n  border-radius: 1px;\n  transition: all 280ms ease;\n  transform-origin: center;\n}\n.tnav-burger.open .bar:nth-child(1) { transform: translateY(6px) rotate(45deg); }\n.tnav-burger.open .bar:nth-child(2) { opacity: 0; transform: scaleX(0); }\n.tnav-burger.open .bar:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }\n.tnav-drawer {\n  position: fixed;\n  top: 56px; left: 0; right: 0;\n  background: rgba(5,5,5,0.97);\n  backdrop-filter: blur(16px);\n  -webkit-backdrop-filter: blur(16px);\n  border-bottom: 0.5px solid rgba(255,255,255,0.07);\n  z-index: 99;\n  display: flex;\n  flex-direction: column;\n  padding: 20px 28px 28px;\n  gap: 0;\n  transform: translateY(-8px);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 240ms ease, transform 240ms ease;\n}\n.tnav-drawer.open {\n  opacity: 1;\n  transform: translateY(0);\n  pointer-events: auto;\n}\n.tnav-drawer-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.55);\n  text-decoration: none;\n  padding: 16px 0;\n  border-bottom: 0.5px solid rgba(255,255,255,0.06);\n  transition: color 180ms ease;\n}\n.tnav-drawer-link:hover { color: #FAFAFA; }\n.tnav-drawer-link:last-child { border-bottom: none; }\n.tnav-drawer-auth {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 11px;\n  font-weight: 500;\n  letter-spacing: 0.24em;\n  text-transform: uppercase;\n  color: #d4af37;\n  text-decoration: none;\n  padding: 18px 0 4px;\n  margin-top: 4px;\n  transition: color 180ms ease;\n}\n.tnav-drawer-auth:hover { color: #e5c84a; }\n\n@media (max-width: 767px) {\n  .tnav-links { display: none; }\n  .tnav-auth-desktop { display: none; }\n  .tnav-burger { display: flex; }\n  .tnav { padding: 0 18px; }\n}\n@media (min-width: 768px) {\n  .tnav-drawer { display: none !important; }\n}\n";
function TopNav() {
    var _this = this;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), scrolled = _useState[0], setScrolled = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), drawerOpen = _useState1[0], setDrawerOpen = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), authed = _useState2[0], setAuthed = _useState2[1];
    // Scroll detection
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopNav.useEffect": function() {
            var onScroll = {
                "TopNav.useEffect.onScroll": function() {
                    return setScrolled(window.scrollY > 40);
                }
            }["TopNav.useEffect.onScroll"];
            window.addEventListener('scroll', onScroll, {
                passive: true
            });
            onScroll();
            return ({
                "TopNav.useEffect": function() {
                    return window.removeEventListener('scroll', onScroll);
                }
            })["TopNav.useEffect"];
        }
    }["TopNav.useEffect"], []);
    // Auth detection — check Supabase session
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopNav.useEffect": function() {
            var checkAuth = function checkAuth() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "TopNav.useEffect.checkAuth": function() {
                        var createClient, supabase, guestId, _ref, session, _supabase_auth_onAuthStateChange, _supabase_auth_onAuthStateChange_data, sub, unused;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "TopNav.useEffect.checkAuth": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        _state.trys.push([
                                            0,
                                            3,
                                            ,
                                            4
                                        ]);
                                        return [
                                            4,
                                            __turbopack_context__.A("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript, async loader)")
                                        ];
                                    case 1:
                                        createClient = _state.sent().createClient;
                                        supabase = createClient(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
                                        guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
                                        return [
                                            4,
                                            supabase.auth.getSession()
                                        ];
                                    case 2:
                                        _ref = _state.sent(), session = _ref.data.session;
                                        setAuthed(!!session && session.user.id !== guestId);
                                        _supabase_auth_onAuthStateChange = supabase.auth.onAuthStateChange({
                                            "TopNav.useEffect.checkAuth": function(_e, s) {
                                                setAuthed(!!s && s.user.id !== guestId);
                                            }
                                        }["TopNav.useEffect.checkAuth"]), _supabase_auth_onAuthStateChange_data = _supabase_auth_onAuthStateChange.data, sub = _supabase_auth_onAuthStateChange_data.subscription;
                                        subscription = sub;
                                        return [
                                            3,
                                            4
                                        ];
                                    case 3:
                                        unused = _state.sent();
                                        setAuthed(false);
                                        return [
                                            3,
                                            4
                                        ];
                                    case 4:
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["TopNav.useEffect.checkAuth"]);
                    }
                }["TopNav.useEffect.checkAuth"])();
            };
            var subscription;
            checkAuth();
            return ({
                "TopNav.useEffect": function() {
                    if (subscription) subscription.unsubscribe();
                }
            })["TopNav.useEffect"];
        }
    }["TopNav.useEffect"], []);
    // Close drawer on outside click
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "TopNav.useEffect": function() {
            if (!drawerOpen) return;
            var close = {
                "TopNav.useEffect.close": function(e) {
                    var target = e.target;
                    if (!target.closest('.tnav')) setDrawerOpen(false);
                }
            }["TopNav.useEffect.close"];
            document.addEventListener('click', close);
            return ({
                "TopNav.useEffect": function() {
                    return document.removeEventListener('click', close);
                }
            })["TopNav.useEffect"];
        }
    }["TopNav.useEffect"], [
        drawerOpen
    ]);
    var authHref = authed ? '/account' : '/login';
    var authLabel = authed ? 'Account' : 'Login';
    var handleAuthClick = function(e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var createClient, supabase;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!!authed) return [
                            3,
                            3
                        ];
                        e.preventDefault();
                        return [
                            4,
                            __turbopack_context__.A("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript, async loader)")
                        ];
                    case 1:
                        createClient = _state.sent().createClient;
                        supabase = createClient(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
                        return [
                            4,
                            supabase.auth.signOut()
                        ];
                    case 2:
                        _state.sent();
                        window.location.href = '/login';
                        _state.label = 3;
                    case 3:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: css
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 247,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "tnav".concat(scrolled ? ' scrolled' : ''),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "tnav-brand",
                        children: "Cutting Corners Gems"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 251,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "tnav-links",
                        children: [
                            NAV_LINKS.map(function(l) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: l.href,
                                    className: "tnav-link",
                                    children: l.label
                                }, l.href, false, {
                                    fileName: "[project]/components/shared/TopNav.tsx",
                                    lineNumber: 256,
                                    columnNumber: 13
                                }, _this);
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                                href: authHref,
                                className: "tnav-auth tnav-auth-desktop",
                                onClick: handleAuthClick,
                                children: authLabel
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 258,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "tnav-burger".concat(drawerOpen ? ' open' : ''),
                        onClick: function() {
                            return setDrawerOpen(function(p) {
                                return !p;
                            });
                        },
                        "aria-label": "Toggle menu",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 269,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "bar"
                            }, void 0, false, {
                                fileName: "[project]/components/shared/TopNav.tsx",
                                lineNumber: 270,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 263,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 249,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tnav-drawer".concat(drawerOpen ? ' open' : ''),
                children: [
                    NAV_LINKS.map(function(l) {
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                            href: l.href,
                            className: "tnav-drawer-link",
                            onClick: function() {
                                return setDrawerOpen(false);
                            },
                            children: l.label
                        }, l.href, false, {
                            fileName: "[project]/components/shared/TopNav.tsx",
                            lineNumber: 277,
                            columnNumber: 11
                        }, _this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: authHref,
                        className: "tnav-drawer-auth",
                        onClick: function(e) {
                            setDrawerOpen(false);
                            handleAuthClick(e);
                        },
                        children: authLabel
                    }, void 0, false, {
                        fileName: "[project]/components/shared/TopNav.tsx",
                        lineNumber: 286,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/TopNav.tsx",
                lineNumber: 275,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(TopNav, "P40JqwO4AslRZ2Hy71FKtEfQ9Yc=");
_c = TopNav;
var _c;
__turbopack_context__.k.register(_c, "TopNav");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shared/Footer.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Footer
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/router.js [client] (ecmascript)");
;
;
var _s = __turbopack_context__.k.signature();
;
var footerCss = "\n.ccg-footer {\n  background: #000000;\n  border-top: 1px solid rgba(255,255,255,0.08);\n  padding: 40px 48px;\n}\n.ccg-footer-tagline {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 11px;\n  letter-spacing: 0.22em;\n  text-transform: uppercase;\n  color: rgba(255,255,255,0.55);\n  margin-bottom: 28px;\n}\n.ccg-footer-content {\n  display: flex;\n  justify-content: space-between;\n  gap: 32px;\n}\n.ccg-footer-links {\n  display: flex;\n  flex-direction: column;\n}\n.ccg-footer-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  color: rgba(255,255,255,0.40);\n  text-decoration: none;\n  line-height: 2.0;\n  transition: color 180ms ease, font-size 150ms ease;\n}\n.ccg-footer-link:hover {\n  color: rgba(255,255,255,0.85);\n  font-size: 12.5px;\n}\n.ccg-footer-contact {\n  display: flex;\n  flex-direction: column;\n}\n.ccg-footer-contact-name {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  color: rgba(255,255,255,0.55);\n  line-height: 2.0;\n}\n.ccg-footer-contact-link {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 12px;\n  letter-spacing: 0.04em;\n  color: rgba(255,255,255,0.40);\n  text-decoration: none;\n  line-height: 2.0;\n  transition: color 180ms ease, font-size 150ms ease;\n}\n.ccg-footer-contact-link:hover {\n  color: rgba(255,255,255,0.85);\n  font-size: 12.5px;\n}\n.ccg-footer-welcome {\n  font-family: 'Comfortaa', sans-serif;\n  font-size: 11px;\n  color: rgba(255,255,255,0.40);\n  font-style: italic;\n  line-height: 2.0;\n}\n\n@media (max-width: 767px) {\n  .ccg-footer {\n    padding: 32px 24px;\n  }\n  .ccg-footer-tagline {\n    margin-bottom: 24px;\n  }\n}\n";
function Footer() {
    _s();
    var router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"])();
    var path = router.pathname;
    // Don't show footer on admin or account routes
    if (path.startsWith('/admin') || path.startsWith('/account')) {
        return null;
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: footerCss
                }
            }, void 0, false, {
                fileName: "[project]/components/shared/Footer.tsx",
                lineNumber: 92,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "ccg-footer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ccg-footer-tagline",
                        children: "COLOR CONSCIOUS CAREFUL CUTTING"
                    }, void 0, false, {
                        fileName: "[project]/components/shared/Footer.tsx",
                        lineNumber: 94,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "ccg-footer-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ccg-footer-links",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/legal",
                                        className: "ccg-footer-link",
                                        children: "legal"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 99,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/our-structure",
                                        className: "ccg-footer-link",
                                        children: "our structure"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/shop",
                                        className: "ccg-footer-link",
                                        children: "shop"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/portfolio",
                                        className: "ccg-footer-link",
                                        children: "portfolio"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "/login",
                                        className: "ccg-footer-link",
                                        children: "sign in / sign up"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 98,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ccg-footer-contact",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-contact-name",
                                        children: "Michael Wall"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 106,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "tel:4802864595",
                                        className: "ccg-footer-contact-link",
                                        children: "480.286.4595"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 107,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                        href: "mailto:mwall@cuttingcornersgems.com",
                                        className: "ccg-footer-contact-link",
                                        children: "mwall@cuttingcornersgems.com"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 108,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ccg-footer-welcome",
                                        children: "texts and emails welcome"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shared/Footer.tsx",
                                        lineNumber: 109,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shared/Footer.tsx",
                                lineNumber: 105,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shared/Footer.tsx",
                        lineNumber: 97,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shared/Footer.tsx",
                lineNumber: 93,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(Footer, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$router$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/supabase.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createServiceClient",
    ()=>createServiceClient,
    "supabase",
    ()=>supabase
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@supabase/supabase-js/dist/index.mjs [client] (ecmascript) <locals>");
;
;
var supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), ("TURBOPACK compile-time value", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp2YmtjaWh5cGJqbG5mZnNib2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MjkwMDMsImV4cCI6MjA4NzMwNTAwM30.ks3k6udociWxERV6LuDkZB_MOUbXyCxHyek2qtUHpfM"));
function createServiceClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://jvbkcihypbjlnffsbohd.supabase.co"), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    });
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/guest/shopTypes.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ghostBtnStyle",
    ()=>ghostBtnStyle,
    "goldBtnStyle",
    ()=>goldBtnStyle,
    "inputBlur",
    ()=>inputBlur,
    "inputFocus",
    ()=>inputFocus,
    "inputStyle",
    ()=>inputStyle,
    "labelStyle",
    ()=>labelStyle,
    "popupBoxStyle",
    ()=>popupBoxStyle,
    "popupOverlayStyle",
    ()=>popupOverlayStyle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
;
var popupOverlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
};
var popupBoxStyle = {
    backgroundColor: '#0A0A0A',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '32px'
};
var inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    color: '#FAFAFA',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '13px',
    outline: 'none',
    marginBottom: '10px'
};
var inputFocus = function(e) {
    e.target.style.borderColor = 'rgba(214,180,70,0.55)';
    e.target.style.boxShadow = '0 0 10px rgba(214,180,70,0.15)';
};
var inputBlur = function(e) {
    e.target.style.borderColor = 'rgba(255,255,255,0.10)';
    e.target.style.boxShadow = 'none';
};
var labelStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '9px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'rgba(255,255,255,0.38)',
    display: 'block',
    marginBottom: '5px'
};
var goldBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.3em',
    background: 'transparent',
    color: '#d4af37',
    border: '1px solid rgba(214,180,70,0.9)',
    padding: '14px 24px',
    marginTop: '16px',
    cursor: 'pointer',
    boxShadow: '0 0 14px rgba(214,180,70,0.35)'
};
var ghostBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.38)',
    border: 'none',
    cursor: 'pointer',
    padding: '12px 0',
    marginTop: '12px'
};
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/guest/GuestInfoPopup.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GuestInfoPopup",
    ()=>GuestInfoPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [client] (ecmascript)");
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
function GuestInfoPopup(param) {
    var onSubmit = param.onSubmit, onClose = param.onClose;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), name = _useState[0], setName = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), email = _useState1[0], setEmail = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), phone = _useState2[0], setPhone = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), address = _useState3[0], setAddress = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), err = _useState4[0], setErr = _useState4[1];
    function handleSubmit() {
        if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
            setErr('All fields are required.');
            return;
        }
        onSubmit({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            address: address.trim()
        });
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupBoxStyle"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '6px'
                    },
                    children: "Your Information"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: '20px',
                        lineHeight: 1.6
                    },
                    children: "Please enter your details before continuing."
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Full Name *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                    placeholder: "Jane Smith",
                    value: name,
                    onChange: function(e) {
                        return setName(e.target.value);
                    },
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Email Address *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                    type: "email",
                    placeholder: "jane@email.com",
                    value: email,
                    onChange: function(e) {
                        return setEmail(e.target.value);
                    },
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 33,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Phone Number *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                    type: "tel",
                    placeholder: "+1 (555) 000-0000",
                    value: phone,
                    onChange: function(e) {
                        return setPhone(e.target.value);
                    },
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                    children: "Shipping Address *"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                    placeholder: "123 Main St, City, State, ZIP",
                    value: address,
                    onChange: function(e) {
                        return setAddress(e.target.value);
                    },
                    onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                    onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '11px',
                        color: '#c07070',
                        marginBottom: '10px'
                    },
                    children: err
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 41,
                    columnNumber: 17
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    onClick: handleSubmit,
                    children: "Continue"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                    onClick: onClose,
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/components/guest/GuestInfoPopup.tsx",
                    lineNumber: 44,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/GuestInfoPopup.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/GuestInfoPopup.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
_s(GuestInfoPopup, "w4cjpTYNKELGOx+wb2eXslk6Bb8=");
_c = GuestInfoPopup;
var _c;
__turbopack_context__.k.register(_c, "GuestInfoPopup");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/utils.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn,
    "fmtDate",
    ()=>fmtDate,
    "fmtTime",
    ()=>fmtTime,
    "formatMoney",
    ()=>formatMoney,
    "relativeTime",
    ()=>relativeTime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [client] (ecmascript)");
;
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
function formatMoney(value) {
    if (value == null || isNaN(Number(value))) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(Number(value));
}
function fmtDate(timestamp) {
    if (!timestamp) return '—';
    var d = new Date(timestamp);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function fmtTime(timestamp) {
    if (!timestamp) return '—';
    var d = new Date(timestamp);
    return d.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}
function relativeTime(timestamp) {
    if (!timestamp) return '';
    var now = Date.now();
    var then = new Date(timestamp).getTime();
    var diff = now - then;
    var seconds = Math.floor(diff / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);
    if (seconds < 60) return 'just now';
    if (minutes < 60) return "".concat(minutes, "m ago");
    if (hours < 24) return "".concat(hours, "h ago");
    if (days < 7) return "".concat(days, "d ago");
    return fmtDate(timestamp);
}
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/guest/InvoicePreviewPopup.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InvoicePreviewPopup",
    ()=>InvoicePreviewPopup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_to_consumable_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [client] (ecmascript)");
;
;
;
;
;
;
;
function InvoicePreviewPopup(param) {
    var _this = this;
    var product = param.product, adminInfo = param.adminInfo, buyerInfo = param.buyerInfo, onContinue = param.onContinue, onCancel = param.onCancel, loading = param.loading;
    var specRows = [
        {
            label: 'Title',
            value: product.title
        },
        {
            label: 'Gem Type',
            value: product.gem_type
        },
        {
            label: 'Shape',
            value: product.shape
        },
        {
            label: 'Weight',
            value: product.weight ? "".concat(product.weight, " ct") : null
        },
        {
            label: 'Color',
            value: product.color
        }
    ].concat((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(product.origin ? [
        {
            label: 'Origin',
            value: product.origin
        }
    ] : []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(product.treatment ? [
        {
            label: 'Treatment',
            value: product.treatment
        }
    ] : []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(product.gia_report_number ? [
        {
            label: 'GIA Report #',
            value: product.gia_report_number
        }
    ] : []), (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_to_consumable_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(product.price_per_carat ? [
        {
            label: 'Price / ct',
            value: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(product.price_per_carat)
        }
    ] : [])).filter(function(r) {
        return r.value;
    });
    var sectionLabel = {
        fontFamily: "'Montserrat', sans-serif",
        fontSize: '9px',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.20em',
        color: 'rgba(255,255,255,0.30)',
        marginBottom: '10px',
        marginTop: '18px'
    };
    var divider = {
        height: '1px',
        backgroundColor: 'rgba(255,255,255,0.06)',
        margin: '16px 0'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupBoxStyle"]), {
                maxWidth: '520px'
            }),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '18px'
                    },
                    children: "Invoice Preview"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: sectionLabel,
                    children: "From"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 36,
                    columnNumber: 9
                }, this),
                adminInfo && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: '#d4af37',
                                fontWeight: 700
                            },
                            children: adminInfo.business_name
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 39,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: adminInfo.full_name
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: adminInfo.address
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: adminInfo.contact_email
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 42,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: adminInfo.phone
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 43,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 38,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: divider
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: sectionLabel,
                    children: "Bill To"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.8
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                color: 'rgba(255,255,255,0.80)'
                            },
                            children: buyerInfo.name
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: buyerInfo.email
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 52,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: buyerInfo.phone
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: buyerInfo.shippingAddress
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 54,
                            columnNumber: 11
                        }, this),
                        buyerInfo.businessName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: buyerInfo.businessName
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 55,
                            columnNumber: 38
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 50,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: divider
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: sectionLabel,
                    children: "Product"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                specRows.map(function(param) {
                    var label = param.label, value = param.value;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: '12px',
                            marginBottom: '8px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '9px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.18em',
                                    color: 'rgba(255,255,255,0.38)',
                                    flexShrink: 0
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                                lineNumber: 63,
                                columnNumber: 13
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontFamily: "'Comfortaa', sans-serif",
                                    fontSize: '12px',
                                    color: 'rgba(255,255,255,0.70)',
                                    textAlign: 'right'
                                },
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                                lineNumber: 64,
                                columnNumber: 13
                            }, _this)
                        ]
                    }, label, true, {
                        fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                        lineNumber: 62,
                        columnNumber: 11
                    }, _this);
                }),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: divider
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '4px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '10px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.18em',
                                color: 'rgba(255,255,255,0.38)'
                            },
                            children: "Total"
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 71,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Courier New', monospace",
                                fontSize: '20px',
                                color: 'rgba(45,212,191,1)'
                            },
                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(product.total_price)
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                            lineNumber: 72,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 70,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.25)',
                        marginBottom: '24px'
                    },
                    children: "Payment method: Card via Stripe"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 74,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    onClick: onContinue,
                    disabled: loading,
                    children: loading ? 'Redirecting...' : 'Continue to Payment'
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 78,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                    onClick: onCancel,
                    children: "Cancel"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
                    lineNumber: 81,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
            lineNumber: 31,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InvoicePreviewPopup.tsx",
        lineNumber: 30,
        columnNumber: 5
    }, this);
}
_c = InvoicePreviewPopup;
var _c;
__turbopack_context__.k.register(_c, "InvoicePreviewPopup");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/guest/ProductDetailModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProductDetailModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [client] (ecmascript) <export default as ShoppingCart>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/message-square.js [client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [client] (ecmascript)");
;
;
;
;
;
;
;
function ProductDetailModal(param) {
    var _this = this;
    var modalProduct = param.product, onClose = param.onClose, handleBuyClick = param.onBuy, handleInquiryClick = param.onInquire, getPhotoUrl = param.getPhotoUrl;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        onClick: function(e) {
            if (e.target === e.currentTarget) {
                onClose();
            }
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupBoxStyle"]), {
                maxWidth: '560px'
            }),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: function() {
                        onClose();
                    },
                    style: {
                        position: 'absolute',
                        top: '12px',
                        right: '12px',
                        background: 'rgba(0,0,0,0.5)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '50%',
                        width: '36px',
                        height: '36px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: '#FAFAFA',
                        zIndex: 10
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                        size: 18
                    }, void 0, false, {
                        fileName: "[project]/components/guest/ProductDetailModal.tsx",
                        lineNumber: 25,
                        columnNumber: 15
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 21,
                    columnNumber: 13
                }, this),
                modalProduct.photo_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        aspectRatio: '4/3'
                    },
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: getPhotoUrl(modalProduct.photo_url),
                        alt: modalProduct.title,
                        style: {
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/guest/ProductDetailModal.tsx",
                        lineNumber: 31,
                        columnNumber: 17
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 30,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    style: {
                        fontFamily: "'Oranienbaum', serif",
                        fontSize: '24px',
                        fontWeight: 400,
                        color: '#FAFAFA',
                        marginBottom: '8px'
                    },
                    children: modalProduct.title
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 39,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Courier New', monospace",
                        fontSize: '22px',
                        color: 'rgba(45,212,191,1)',
                        marginBottom: '20px'
                    },
                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(modalProduct.total_price)
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 43,
                    columnNumber: 13
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px'
                    },
                    children: [
                        {
                            label: 'Gem Type',
                            value: modalProduct.gem_type
                        },
                        {
                            label: 'Shape',
                            value: modalProduct.shape
                        },
                        {
                            label: 'Weight',
                            value: modalProduct.weight ? "".concat(modalProduct.weight, " ct") : null
                        },
                        {
                            label: 'Color',
                            value: modalProduct.color
                        },
                        {
                            label: 'Origin',
                            value: modalProduct.origin
                        },
                        {
                            label: 'Treatment',
                            value: modalProduct.treatment
                        },
                        {
                            label: 'Price/ct',
                            value: modalProduct.price_per_carat ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["formatMoney"])(modalProduct.price_per_carat) : null
                        }
                    ].filter(function(r) {
                        return r.value;
                    }).map(function(param) {
                        var label = param.label, value = param.value;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '6px'
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '9px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.18em',
                                        color: 'rgba(255,255,255,0.38)'
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 59,
                                    columnNumber: 19
                                }, _this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    style: {
                                        fontFamily: "'Comfortaa', sans-serif",
                                        fontSize: '12px',
                                        color: 'rgba(255,255,255,0.70)'
                                    },
                                    children: value
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 60,
                                    columnNumber: 19
                                }, _this)
                            ]
                        }, label, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 58,
                            columnNumber: 17
                        }, _this);
                    })
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                }, this),
                modalProduct.gia_report_number && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        marginBottom: '20px',
                        padding: '12px',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.06)'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.18em',
                                color: 'rgba(255,255,255,0.38)'
                            },
                            children: "GIA Report"
                        }, void 0, false, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 68,
                            columnNumber: 17
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.70)',
                                margin: '4px 0 0'
                            },
                            children: [
                                "#",
                                modalProduct.gia_report_number,
                                modalProduct.gia_report_pdf_url && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: modalProduct.gia_report_pdf_url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    style: {
                                        color: '#d4af37',
                                        marginLeft: '8px',
                                        fontSize: '11px'
                                    },
                                    children: "View Report"
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 72,
                                    columnNumber: 21
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 69,
                            columnNumber: 17
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 67,
                    columnNumber: 15
                }, this),
                modalProduct.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '13px',
                        lineHeight: 1.75,
                        color: 'rgba(255,255,255,0.55)',
                        marginBottom: '24px'
                    },
                    children: modalProduct.description
                }, void 0, false, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 81,
                    columnNumber: 15
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        display: 'flex',
                        gap: '10px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["goldBtnStyle"]), {
                                flex: 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            }),
                            onClick: handleBuyClick,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 91,
                                    columnNumber: 17
                                }, this),
                                " Buy Now"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 87,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            style: {
                                flex: 1,
                                textAlign: 'center',
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '11px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.20em',
                                backgroundColor: 'transparent',
                                color: 'rgba(255,255,255,0.65)',
                                border: '1px solid rgba(255,255,255,0.15)',
                                padding: '14px 24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px'
                            },
                            onClick: handleInquiryClick,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"], {
                                    size: 14
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                                    lineNumber: 97,
                                    columnNumber: 17
                                }, this),
                                " Inquire"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/ProductDetailModal.tsx",
                            lineNumber: 93,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/ProductDetailModal.tsx",
                    lineNumber: 86,
                    columnNumber: 13
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/ProductDetailModal.tsx",
            lineNumber: 20,
            columnNumber: 11
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/ProductDetailModal.tsx",
        lineNumber: 16,
        columnNumber: 9
    }, this);
}
_c = ProductDetailModal;
var _c;
__turbopack_context__.k.register(_c, "ProductDetailModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/guest/InquiryContactForm.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "InquiryContactForm",
    ()=>InquiryContactForm,
    "InquiryDescForm",
    ()=>InquiryDescForm
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
function InquiryContactForm(param) {
    var onSubmit = param.onSubmit, onClose = param.onClose;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), firstName = _useState[0], setFirstName = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), lastName = _useState1[0], setLastName = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])('+1 '), 2), phone = _useState2[0], setPhone = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), email = _useState3[0], setEmail = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), addr1 = _useState4[0], setAddr1 = _useState4[1];
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), addr2 = _useState5[0], setAddr2 = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), city = _useState6[0], setCity = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), addrState = _useState7[0], setAddrState = _useState7[1];
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), country = _useState8[0], setCountry = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), zip = _useState9[0], setZip = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), err = _useState10[0], setErr = _useState10[1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '10px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                                children: "First Name *"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 20,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                                placeholder: "Jane",
                                value: firstName,
                                onChange: function(e) {
                                    return setFirstName(e.target.value);
                                },
                                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 21,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 19,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                                children: "Last Name *"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 24,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                                placeholder: "Smith",
                                value: lastName,
                                onChange: function(e) {
                                    return setLastName(e.target.value);
                                },
                                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Phone Number *"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 28,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                type: "tel",
                placeholder: "+1 (555) 000-0000",
                value: phone,
                onChange: function(e) {
                    return setPhone(e.target.value);
                },
                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Email Address *"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"],
                type: "email",
                placeholder: "jane@email.com",
                value: email,
                onChange: function(e) {
                    return setEmail(e.target.value);
                },
                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Shipping Address"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 32,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                            flex: 2,
                            marginBottom: 0
                        }),
                        placeholder: "Address Line 1",
                        value: addr1,
                        onChange: function(e) {
                            return setAddr1(e.target.value);
                        },
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 34,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                            flex: 1,
                            marginBottom: 0
                        }),
                        placeholder: "Apt / Suite",
                        value: addr2,
                        onChange: function(e) {
                            return setAddr2(e.target.value);
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 35,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 33,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px',
                    marginBottom: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                            flex: 2,
                            marginBottom: 0
                        }),
                        placeholder: "City",
                        value: city,
                        onChange: function(e) {
                            return setCity(e.target.value);
                        },
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 38,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                            flex: 1,
                            marginBottom: 0
                        }),
                        placeholder: "State",
                        value: addrState,
                        onChange: function(e) {
                            return setAddrState(e.target.value);
                        },
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 39,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    gap: '8px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                            flex: 2,
                            marginBottom: 0
                        }),
                        value: country,
                        onChange: function(e) {
                            return setCountry(e.target.value);
                        },
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"],
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "Country"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 43,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Afghanistan",
                                children: "Afghanistan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 44,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Albania",
                                children: "Albania"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 45,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Algeria",
                                children: "Algeria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 46,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Andorra",
                                children: "Andorra"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 47,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Angola",
                                children: "Angola"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 48,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Argentina",
                                children: "Argentina"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 49,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Armenia",
                                children: "Armenia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Australia",
                                children: "Australia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Austria",
                                children: "Austria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 52,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Azerbaijan",
                                children: "Azerbaijan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 53,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Bahamas",
                                children: "Bahamas"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 54,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Bahrain",
                                children: "Bahrain"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Bangladesh",
                                children: "Bangladesh"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 56,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Belarus",
                                children: "Belarus"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 57,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Belgium",
                                children: "Belgium"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Belize",
                                children: "Belize"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Bolivia",
                                children: "Bolivia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 60,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Bosnia and Herzegovina",
                                children: "Bosnia and Herzegovina"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 61,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Brazil",
                                children: "Brazil"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Bulgaria",
                                children: "Bulgaria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 63,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Cambodia",
                                children: "Cambodia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 64,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Canada",
                                children: "Canada"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Chile",
                                children: "Chile"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 66,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "China",
                                children: "China"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 67,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Colombia",
                                children: "Colombia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 68,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Costa Rica",
                                children: "Costa Rica"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Croatia",
                                children: "Croatia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 70,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Cuba",
                                children: "Cuba"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Cyprus",
                                children: "Cyprus"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 72,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Czech Republic",
                                children: "Czech Republic"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 73,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Denmark",
                                children: "Denmark"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 74,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Dominican Republic",
                                children: "Dominican Republic"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 75,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Ecuador",
                                children: "Ecuador"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Egypt",
                                children: "Egypt"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 77,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "El Salvador",
                                children: "El Salvador"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 78,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Estonia",
                                children: "Estonia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 79,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Ethiopia",
                                children: "Ethiopia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 80,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Finland",
                                children: "Finland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 81,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "France",
                                children: "France"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 82,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Georgia",
                                children: "Georgia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 83,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Germany",
                                children: "Germany"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 84,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Ghana",
                                children: "Ghana"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 85,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Greece",
                                children: "Greece"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Guatemala",
                                children: "Guatemala"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 87,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Honduras",
                                children: "Honduras"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 88,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Hungary",
                                children: "Hungary"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 89,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Iceland",
                                children: "Iceland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "India",
                                children: "India"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 91,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Indonesia",
                                children: "Indonesia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 92,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Iran",
                                children: "Iran"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 93,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Iraq",
                                children: "Iraq"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 94,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Ireland",
                                children: "Ireland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 95,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Israel",
                                children: "Israel"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 96,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Italy",
                                children: "Italy"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 97,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Jamaica",
                                children: "Jamaica"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 98,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Japan",
                                children: "Japan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 99,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Jordan",
                                children: "Jordan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Kazakhstan",
                                children: "Kazakhstan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 101,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Kenya",
                                children: "Kenya"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 102,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Kuwait",
                                children: "Kuwait"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 103,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Latvia",
                                children: "Latvia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Lebanon",
                                children: "Lebanon"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 105,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Lithuania",
                                children: "Lithuania"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 106,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Luxembourg",
                                children: "Luxembourg"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 107,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Malaysia",
                                children: "Malaysia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 108,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Mexico",
                                children: "Mexico"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 109,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Moldova",
                                children: "Moldova"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 110,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Monaco",
                                children: "Monaco"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 111,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Morocco",
                                children: "Morocco"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 112,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Nepal",
                                children: "Nepal"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 113,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Netherlands",
                                children: "Netherlands"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 114,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "New Zealand",
                                children: "New Zealand"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 115,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Nicaragua",
                                children: "Nicaragua"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 116,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Nigeria",
                                children: "Nigeria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 117,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "North Korea",
                                children: "North Korea"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 118,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Norway",
                                children: "Norway"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 119,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Oman",
                                children: "Oman"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Pakistan",
                                children: "Pakistan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 121,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Panama",
                                children: "Panama"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 122,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Paraguay",
                                children: "Paraguay"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 123,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Peru",
                                children: "Peru"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 124,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Philippines",
                                children: "Philippines"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 125,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Poland",
                                children: "Poland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 126,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Portugal",
                                children: "Portugal"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 127,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Qatar",
                                children: "Qatar"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 128,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Romania",
                                children: "Romania"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 129,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Russia",
                                children: "Russia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 130,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Saudi Arabia",
                                children: "Saudi Arabia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Senegal",
                                children: "Senegal"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 132,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Serbia",
                                children: "Serbia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 133,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Singapore",
                                children: "Singapore"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 134,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Slovakia",
                                children: "Slovakia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 135,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "South Africa",
                                children: "South Africa"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 136,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "South Korea",
                                children: "South Korea"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 137,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Spain",
                                children: "Spain"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 138,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Sri Lanka",
                                children: "Sri Lanka"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 139,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Sweden",
                                children: "Sweden"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Switzerland",
                                children: "Switzerland"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 141,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Syria",
                                children: "Syria"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 142,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Taiwan",
                                children: "Taiwan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 143,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Thailand",
                                children: "Thailand"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 144,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Trinidad and Tobago",
                                children: "Trinidad and Tobago"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 145,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Tunisia",
                                children: "Tunisia"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 146,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Turkey",
                                children: "Turkey"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 147,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Ukraine",
                                children: "Ukraine"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 148,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "United Arab Emirates",
                                children: "United Arab Emirates"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 149,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "United Kingdom",
                                children: "United Kingdom"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 150,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "United States",
                                children: "United States"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 151,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Uruguay",
                                children: "Uruguay"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 152,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Uzbekistan",
                                children: "Uzbekistan"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 153,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Venezuela",
                                children: "Venezuela"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 154,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Vietnam",
                                children: "Vietnam"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 155,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Yemen",
                                children: "Yemen"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 156,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "Zimbabwe",
                                children: "Zimbabwe"
                            }, void 0, false, {
                                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                                lineNumber: 157,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 42,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                            flex: 1,
                            marginBottom: 0
                        }),
                        placeholder: "ZIP",
                        value: zip,
                        onChange: function(e) {
                            return setZip(e.target.value);
                        },
                        onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                        onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
                    }, void 0, false, {
                        fileName: "[project]/components/guest/InquiryContactForm.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            err && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    fontSize: '11px',
                    color: '#c07070',
                    marginBottom: '10px'
                },
                children: err
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 161,
                columnNumber: 15
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                onClick: function() {
                    if (!firstName.trim() || !lastName.trim() || !phone.trim() || !email.trim()) {
                        setErr('All fields are required.');
                        return;
                    }
                    var shipping = [
                        addr1.trim(),
                        addr2.trim(),
                        city.trim(),
                        addrState.trim(),
                        zip.trim(),
                        country.trim()
                    ].filter(Boolean).join(', ');
                    onSubmit({
                        firstName: firstName.trim(),
                        lastName: lastName.trim(),
                        email: email.trim(),
                        phone: phone.trim(),
                        shipping_address: shipping
                    });
                },
                children: "Continue"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 162,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                onClick: onClose,
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 167,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s(InquiryContactForm, "+EtIWvzt7+v5tq3beGue+zaRR1U=");
_c = InquiryContactForm;
function InquiryDescForm(param) {
    var onSubmit = param.onSubmit, onClose = param.onClose, submitting = param.submitting;
    _s1();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(''), 2), desc = _useState[0], setDesc = _useState[1];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["labelStyle"],
                children: "Your Message *"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 176,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputStyle"]), {
                    minHeight: '100px',
                    resize: 'vertical'
                }),
                placeholder: "Tell us about your interest in this gem...",
                value: desc,
                onChange: function(e) {
                    return setDesc(e.target.value);
                },
                onFocus: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputFocus"],
                onBlur: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["inputBlur"]
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 177,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["goldBtnStyle"]), {
                    opacity: submitting || !desc.trim() ? 0.5 : 1
                }),
                onClick: function() {
                    if (desc.trim()) onSubmit(desc.trim());
                },
                disabled: submitting || !desc.trim(),
                children: submitting ? 'Sending...' : 'Submit Inquiry'
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 184,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["ghostBtnStyle"],
                onClick: onClose,
                children: "Cancel"
            }, void 0, false, {
                fileName: "[project]/components/guest/InquiryContactForm.tsx",
                lineNumber: 189,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
}
_s1(InquiryDescForm, "PXJDrnLy0bhKfwVDDNyeeq+Hn8E=");
_c1 = InquiryDescForm;
var _c, _c1;
__turbopack_context__.k.register(_c, "InquiryContactForm");
__turbopack_context__.k.register(_c1, "InquiryDescForm");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/guest/InquiryModal.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>InquiryModal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_object_spread_props.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/shopTypes.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryContactForm$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/InquiryContactForm.tsx [client] (ecmascript)");
;
;
;
;
;
;
function InquiryModal(param) {
    var inquiryStep = param.inquiryStep, modalProduct = param.product, guestCollected = param.guestCollected, accountUser = param.accountUser, inquirySubmitting = param.submitting, handleGuestInfoForInquiry = param.onGuestInfoSubmit, closeInquiry = param.onClose, handleInquiryDescSubmit = param.onDescSubmit, handleInquiryOK = param.onOK;
    var displayName = guestCollected ? guestCollected.firstName + ' ' + guestCollected.lastName : (accountUser === null || accountUser === void 0 ? void 0 : accountUser.name) || '';
    var displayEmail = (guestCollected === null || guestCollected === void 0 ? void 0 : guestCollected.email) || (accountUser === null || accountUser === void 0 ? void 0 : accountUser.email) || '';
    var displayPhone = (guestCollected === null || guestCollected === void 0 ? void 0 : guestCollected.phone) || (accountUser === null || accountUser === void 0 ? void 0 : accountUser.phone) || '';
    if (inquiryStep === 'collect-info') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupBoxStyle"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '6px'
                    },
                    children: "Inquire About This Gem"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '12px',
                        color: 'rgba(255,255,255,0.45)',
                        marginBottom: '20px',
                        lineHeight: 1.6
                    },
                    children: "Please share your contact details so we can follow up."
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 25,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryContactForm$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["InquiryContactForm"], {
                    onSubmit: handleGuestInfoForInquiry,
                    onClose: closeInquiry
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 26,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InquiryModal.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InquiryModal.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
    if (inquiryStep === 'describe') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupBoxStyle"],
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '10px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(255,255,255,0.52)',
                        marginBottom: '6px'
                    },
                    children: [
                        "Inquiry — ",
                        modalProduct.title
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 34,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        borderRadius: '8px',
                        padding: '14px 16px',
                        marginBottom: '20px'
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Montserrat', sans-serif",
                                fontSize: '9px',
                                textTransform: 'uppercase',
                                letterSpacing: '0.18em',
                                color: 'rgba(255,255,255,0.30)',
                                marginBottom: '8px'
                            },
                            children: "Your Details"
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InquiryModal.tsx",
                            lineNumber: 36,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontFamily: "'Comfortaa', sans-serif",
                                fontSize: '13px',
                                color: 'rgba(255,255,255,0.65)',
                                lineHeight: 1.7
                            },
                            children: [
                                displayName && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: displayName
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/InquiryModal.tsx",
                                    lineNumber: 38,
                                    columnNumber: 29
                                }, this),
                                displayEmail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: displayEmail
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/InquiryModal.tsx",
                                    lineNumber: 39,
                                    columnNumber: 30
                                }, this),
                                displayPhone && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: displayPhone
                                }, void 0, false, {
                                    fileName: "[project]/components/guest/InquiryModal.tsx",
                                    lineNumber: 40,
                                    columnNumber: 30
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/guest/InquiryModal.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 35,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryContactForm$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["InquiryDescForm"], {
                    onSubmit: handleInquiryDescSubmit,
                    onClose: closeInquiry,
                    submitting: inquirySubmitting
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 43,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InquiryModal.tsx",
            lineNumber: 33,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InquiryModal.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
    if (inquiryStep === 'success') return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupOverlayStyle"],
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread_props$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_object_spread$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({}, __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["popupBoxStyle"]), {
                textAlign: 'center'
            }),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        fontSize: '32px',
                        marginBottom: '16px'
                    },
                    children: "✓"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '12px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.20em',
                        color: 'rgba(45,212,191,1)',
                        marginBottom: '10px'
                    },
                    children: "Inquiry Sent!"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 52,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    style: {
                        fontFamily: "'Comfortaa', sans-serif",
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.50)',
                        lineHeight: 1.7,
                        marginBottom: '28px'
                    },
                    children: [
                        "We've received your inquiry about ",
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                            style: {
                                color: 'rgba(255,255,255,0.75)'
                            },
                            children: modalProduct.title
                        }, void 0, false, {
                            fileName: "[project]/components/guest/InquiryModal.tsx",
                            lineNumber: 54,
                            columnNumber: 45
                        }, this),
                        " and will be in touch soon."
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 53,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    style: __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$shopTypes$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["goldBtnStyle"],
                    onClick: handleInquiryOK,
                    children: "OK"
                }, void 0, false, {
                    fileName: "[project]/components/guest/InquiryModal.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/guest/InquiryModal.tsx",
            lineNumber: 50,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/guest/InquiryModal.tsx",
        lineNumber: 49,
        columnNumber: 5
    }, this);
    return null;
}
_c = InquiryModal;
var _c;
__turbopack_context__.k.register(_c, "InquiryModal");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/pages/shop.tsx [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ShopPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_async_to_generator.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_sliced_to_array.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@swc/helpers/esm/_type_of.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__ = __turbopack_context__.i("[project]/node_modules/tslib/tslib.es6.mjs [client] (ecmascript) <export __generator as _>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/TopNav.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/shared/Footer.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/supabase.ts [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$GuestInfoPopup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/GuestInfoPopup.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InvoicePreviewPopup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/InvoicePreviewPopup.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$ProductDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/ProductDetailModal.tsx [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/guest/InquiryModal.tsx [client] (ecmascript)");
;
;
;
;
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
;
;
;
;
// ── Shared Styles ────────────────────────────────────────────
var popupOverlayStyle = {
    position: 'fixed',
    inset: 0,
    zIndex: 200,
    backgroundColor: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px'
};
var popupBoxStyle = {
    backgroundColor: '#0A0A0A',
    border: '1px solid rgba(255,255,255,0.10)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '480px',
    maxHeight: '90vh',
    overflowY: 'auto',
    padding: '32px'
};
var inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.10)',
    padding: '10px 12px',
    color: '#FAFAFA',
    fontFamily: "'Comfortaa', sans-serif",
    fontSize: '13px',
    outline: 'none',
    marginBottom: '10px'
};
var labelStyle = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '9px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    color: 'rgba(255,255,255,0.38)',
    display: 'block',
    marginBottom: '5px'
};
var goldBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.20em',
    backgroundColor: '#d4af37',
    color: '#050505',
    border: 'none',
    padding: '14px 24px',
    cursor: 'pointer'
};
var ghostBtnStyle = {
    width: '100%',
    textAlign: 'center',
    fontFamily: "'Montserrat', sans-serif",
    fontSize: '10px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.18em',
    backgroundColor: 'transparent',
    color: 'rgba(255,255,255,0.38)',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 0',
    marginTop: '8px'
};
function ShopPage() {
    var _this = this;
    _s();
    var _useState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), session = _useState[0], setSession = _useState[1];
    var _useState1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]), 2), products = _useState1[0], setProducts = _useState1[1];
    var _useState2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(true), 2), loading = _useState2[0], setLoading = _useState2[1];
    var _useState3 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), modalProduct = _useState3[0], setModalProduct = _useState3[1];
    var _useState4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), tappedProduct = _useState4[0], setTappedProduct = _useState4[1];
    var handleCardClick = function(product) {
        var isMobile = window.innerWidth < 768;
        if (!isMobile) {
            setModalProduct(product);
            return;
        }
        if (tappedProduct === product.product_id) {
            setModalProduct(product);
            setTappedProduct(null);
        } else {
            setTappedProduct(product.product_id);
        }
    };
    // Guest info
    var _useState5 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), guestInfo = _useState5[0], setGuestInfo = _useState5[1];
    var _useState6 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showGuestPopup = _useState6[0], setShowGuestPopup = _useState6[1];
    var _useState7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), pendingAction = _useState7[0], setPendingAction = _useState7[1];
    // Inquiry state
    var _useState8 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), inquiryStep = _useState8[0], setInquiryStep = _useState8[1];
    var _useState9 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), guestCollected = _useState9[0], setGuestCollected = _useState9[1];
    var _useState10 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), inquirySubmitting = _useState10[0], setInquirySubmitting = _useState10[1];
    // Invoice preview
    var _useState11 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), showInvoicePreview = _useState11[0], setShowInvoicePreview = _useState11[1];
    var _useState12 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), adminInfo = _useState12[0], setAdminInfo = _useState12[1];
    var _useState13 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(null), 2), accountUser = _useState13[0], setAccountUser = _useState13[1];
    var _useState14 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_sliced_to_array$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])(false), 2), checkoutLoading = _useState14[0], setCheckoutLoading = _useState14[1];
    // Auth — auto sign out if somehow logged in as guest on page load
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": function() {
            var guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.getSession().then({
                "ShopPage.useEffect": function(param) {
                    var _param_data = param.data, s = _param_data.session;
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "ShopPage.useEffect": function() {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "ShopPage.useEffect": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            if (!(s && s.user.id === guestId)) return [
                                                3,
                                                2
                                            ];
                                            return [
                                                4,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut()
                                            ];
                                        case 1:
                                            _state.sent();
                                            setSession(null);
                                            return [
                                                3,
                                                3
                                            ];
                                        case 2:
                                            setSession(s);
                                            _state.label = 3;
                                        case 3:
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["ShopPage.useEffect"]);
                        }
                    }["ShopPage.useEffect"])();
                }
            }["ShopPage.useEffect"]);
            var _supabase_auth_onAuthStateChange = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.onAuthStateChange({
                "ShopPage.useEffect._supabase_auth_onAuthStateChange": function(_e, s) {
                    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                        "ShopPage.useEffect._supabase_auth_onAuthStateChange": function() {
                            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                                "ShopPage.useEffect._supabase_auth_onAuthStateChange": function(_state) {
                                    switch(_state.label){
                                        case 0:
                                            if (!(s && s.user.id === guestId)) return [
                                                3,
                                                2
                                            ];
                                            return [
                                                4,
                                                __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].auth.signOut()
                                            ];
                                        case 1:
                                            _state.sent();
                                            setSession(null);
                                            return [
                                                3,
                                                3
                                            ];
                                        case 2:
                                            setSession(s);
                                            _state.label = 3;
                                        case 3:
                                            return [
                                                2
                                            ];
                                    }
                                }
                            }["ShopPage.useEffect._supabase_auth_onAuthStateChange"]);
                        }
                    }["ShopPage.useEffect._supabase_auth_onAuthStateChange"])();
                }
            }["ShopPage.useEffect._supabase_auth_onAuthStateChange"]), subscription = _supabase_auth_onAuthStateChange.data.subscription;
            return ({
                "ShopPage.useEffect": function() {
                    return subscription.unsubscribe();
                }
            })["ShopPage.useEffect"];
        }
    }["ShopPage.useEffect"], []);
    // Load products
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": function() {
            var load = function load() {
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])({
                    "ShopPage.useEffect.load": function() {
                        var _ref, data, error, _ref1, fallback;
                        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, {
                            "ShopPage.useEffect.load": function(_state) {
                                switch(_state.label){
                                    case 0:
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('shop_active_products').select('*')
                                        ];
                                    case 1:
                                        _ref = _state.sent(), data = _ref.data, error = _ref.error;
                                        if (!(!error && data)) return [
                                            3,
                                            2
                                        ];
                                        setProducts(data);
                                        return [
                                            3,
                                            4
                                        ];
                                    case 2:
                                        return [
                                            4,
                                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('products').select('*').eq('product_state', 'PUBLISHED').order('created_at', {
                                                ascending: false
                                            })
                                        ];
                                    case 3:
                                        _ref1 = _state.sent(), fallback = _ref1.data;
                                        setProducts(fallback || []);
                                        _state.label = 4;
                                    case 4:
                                        setLoading(false);
                                        return [
                                            2
                                        ];
                                }
                            }
                        }["ShopPage.useEffect.load"]);
                    }
                }["ShopPage.useEffect.load"])();
            };
            load();
        }
    }["ShopPage.useEffect"], []);
    // Load account user info if authenticated
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShopPage.useEffect": function() {
            if (!session) {
                setAccountUser(null);
                return;
            }
            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_users').select('*').eq('account_user_id', session.user.id).single().then({
                "ShopPage.useEffect": function(param) {
                    var data = param.data;
                    return setAccountUser(data);
                }
            }["ShopPage.useEffect"]);
        }
    }["ShopPage.useEffect"], [
        session
    ]);
    // Photo URL helper
    var getPhotoUrl = function(url) {
        if (!url) return null;
        if (url.startsWith('http')) return url;
        return __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].storage.from('product-photos').getPublicUrl(url).data.publicUrl;
    };
    // ── Inquiry Flow ────────────────────────────────────────
    var guestId = ("TURBOPACK compile-time value", "18cf77dc-6e41-42bb-abb3-0ae8615bbc20");
    var isRealUser = session && session.user.id !== guestId;
    var handleInquiryClick = function() {
        if (isRealUser) {
            setInquiryStep('describe');
        } else {
            setInquiryStep('collect-info');
        }
    };
    var handleGuestInfoForInquiry = function(info) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                setGuestCollected(info);
                setInquiryStep('describe');
                return [
                    2
                ];
            });
        })();
    };
    var handleInquiryDescSubmit = function(desc) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var e;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!modalProduct) return [
                            2
                        ];
                        setInquirySubmitting(true);
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            8,
                            ,
                            9
                        ]);
                        if (!isRealUser) return [
                            3,
                            4
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('account_inquiries').insert({
                                account_user_id: session.user.id,
                                description: desc,
                                product_id: modalProduct.product_id,
                                photo_url: null
                            })
                        ];
                    case 2:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                                body: {
                                    event_type: 'account_inquiries',
                                    user_id: session.user.id
                                }
                            }).catch(function() {})
                        ];
                    case 3:
                        _state.sent();
                        return [
                            3,
                            7
                        ];
                    case 4:
                        if (!guestCollected) return [
                            3,
                            7
                        ];
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('guest_inquiries').insert({
                                name: guestCollected.firstName + ' ' + guestCollected.lastName,
                                email: guestCollected.email,
                                phone: guestCollected.phone,
                                shipping_address: 'Not provided',
                                description: desc,
                                product_id: modalProduct.product_id,
                                photo_url: null
                            })
                        ];
                    case 5:
                        _state.sent();
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].functions.invoke('send-admin-notification', {
                                body: {
                                    event_type: 'guest_inquiries',
                                    guest_name: guestCollected.firstName + ' ' + guestCollected.lastName
                                }
                            }).catch(function() {})
                        ];
                    case 6:
                        _state.sent();
                        _state.label = 7;
                    case 7:
                        setInquiryStep('success');
                        return [
                            3,
                            9
                        ];
                    case 8:
                        e = _state.sent();
                        console.error('Inquiry error:', e);
                        return [
                            3,
                            9
                        ];
                    case 9:
                        setInquirySubmitting(false);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var handleInquiryOK = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                setInquiryStep(null);
                setGuestCollected(null);
                setModalProduct(null);
                return [
                    2
                ];
            });
        })();
    };
    var closeInquiry = function() {
        setInquiryStep(null);
        setGuestCollected(null);
    };
    // ── Purchase Flow ───────────────────────────────────────
    var handleBuyClick = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var _ref, admin;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!session && !guestInfo) {
                            setPendingAction('buy');
                            setShowGuestPopup(true);
                            return [
                                2
                            ];
                        }
                        return [
                            4,
                            __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$supabase$2e$ts__$5b$client$5d$__$28$ecmascript$29$__["supabase"].from('admin_users').select('business_name, full_name, address, phone, contact_email').single()
                        ];
                    case 1:
                        _ref = _state.sent(), admin = _ref.data;
                        setAdminInfo(admin);
                        setShowInvoicePreview(true);
                        return [
                            2
                        ];
                }
            });
        })();
    };
    var handleCheckout = function() {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_async_to_generator$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(function() {
            var isGuest, buyerInfo, _session_user, backendUrl, res, _ref, url, error, e;
            return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tslib$2f$tslib$2e$es6$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__$3c$export__$5f$_generator__as__$5f3e$__["_"])(this, function(_state) {
                switch(_state.label){
                    case 0:
                        if (!modalProduct) return [
                            2
                        ];
                        setCheckoutLoading(true);
                        isGuest = !session;
                        buyerInfo = isGuest && guestInfo ? {
                            name: guestInfo.name,
                            email: guestInfo.email,
                            phone: guestInfo.phone,
                            shippingAddress: guestInfo.address,
                            businessName: null
                        } : accountUser ? {
                            name: accountUser.name,
                            email: accountUser.email,
                            phone: accountUser.phone,
                            shippingAddress: accountUser.shipping_address,
                            businessName: accountUser.business_name
                        } : {
                            name: '',
                            email: '',
                            phone: '',
                            shippingAddress: '',
                            businessName: null
                        };
                        _state.label = 1;
                    case 1:
                        _state.trys.push([
                            1,
                            4,
                            ,
                            5
                        ]);
                        backendUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_BACKEND_URL || '';
                        return [
                            4,
                            fetch("".concat(backendUrl, "/api/checkout/create-session"), {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    product_id: modalProduct.product_id,
                                    guest: isGuest,
                                    guest_info: isGuest ? guestInfo : undefined,
                                    account_user_id: session === null || session === void 0 ? void 0 : (_session_user = session.user) === null || _session_user === void 0 ? void 0 : _session_user.id,
                                    admin_snapshot: adminInfo ? {
                                        businessName: adminInfo.business_name,
                                        fullName: adminInfo.full_name,
                                        address: adminInfo.address,
                                        phone: adminInfo.phone,
                                        contactEmail: adminInfo.contact_email
                                    } : {},
                                    account_snapshot: buyerInfo,
                                    line_items: [
                                        {
                                            product_id: modalProduct.product_id,
                                            title: modalProduct.title,
                                            gem_type: modalProduct.gem_type,
                                            shape: modalProduct.shape,
                                            weight: modalProduct.weight,
                                            color: modalProduct.color,
                                            origin: modalProduct.origin,
                                            treatment: modalProduct.treatment,
                                            description: modalProduct.description,
                                            price_per_carat: modalProduct.price_per_carat,
                                            total_price: modalProduct.total_price,
                                            gia_report_number: modalProduct.gia_report_number,
                                            gia_report_pdf_url: modalProduct.gia_report_pdf_url,
                                            photo_url: modalProduct.photo_url
                                        }
                                    ]
                                })
                            })
                        ];
                    case 2:
                        res = _state.sent();
                        return [
                            4,
                            res.json()
                        ];
                    case 3:
                        _ref = _state.sent(), url = _ref.url, error = _ref.error;
                        if (url) {
                            window.location.href = url;
                        } else {
                            console.error('Checkout error:', error);
                            setCheckoutLoading(false);
                        }
                        return [
                            3,
                            5
                        ];
                    case 4:
                        e = _state.sent();
                        console.error('Checkout error:', e);
                        setCheckoutLoading(false);
                        return [
                            3,
                            5
                        ];
                    case 5:
                        return [
                            2
                        ];
                }
            });
        })();
    };
    // Guest info callback
    var handleGuestInfoSubmit = function(info) {
        setGuestInfo(info);
        setShowGuestPopup(false);
        if (pendingAction === 'buy') {
            setPendingAction(null);
            // Trigger buy flow after setting guest info
            setTimeout(function() {
                return handleBuyClick();
            }, 100);
        }
        setPendingAction(null);
    };
    var buyerInfo = session && accountUser ? {
        name: accountUser.name || '',
        email: accountUser.email || '',
        phone: accountUser.phone || '',
        shippingAddress: accountUser.shipping_address || '',
        businessName: accountUser.business_name
    } : guestInfo ? {
        name: guestInfo.name,
        email: guestInfo.email,
        phone: guestInfo.phone,
        shippingAddress: guestInfo.address,
        businessName: null
    } : {
        name: '',
        email: '',
        phone: '',
        shippingAddress: '',
        businessName: null
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("style", {
                dangerouslySetInnerHTML: {
                    __html: shopCss
                }
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 335,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$TopNav$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 336,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                style: {
                    background: '#050505',
                    minHeight: '100vh',
                    paddingTop: '56px'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: '1200px',
                            margin: '0 auto',
                            padding: '48px 48px 80px'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: '11px',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.20em',
                                    color: 'rgba(255,255,255,0.52)',
                                    marginBottom: '8px'
                                },
                                children: "Gems for Sale"
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 339,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontFamily: "'Montserrat', sans-serif",
                                    fontSize: 'clamp(30px, 6vw, 60px)',
                                    fontWeight: 400,
                                    color: '#FAFAFA',
                                    marginBottom: '48px'
                                },
                                children: "Shop"
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 348,
                                columnNumber: 11
                            }, this),
                            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '80px 0',
                                    color: 'rgba(255,255,255,0.45)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em'
                                    },
                                    children: "Loading..."
                                }, void 0, false, {
                                    fileName: "[project]/pages/shop.tsx",
                                    lineNumber: 360,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 359,
                                columnNumber: 13
                            }, this) : products.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '80px 0',
                                    color: 'rgba(255,255,255,0.45)'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        fontFamily: "'Montserrat', sans-serif",
                                        fontSize: '11px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.2em'
                                    },
                                    children: "No products available"
                                }, void 0, false, {
                                    fileName: "[project]/pages/shop.tsx",
                                    lineNumber: 366,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 365,
                                columnNumber: 13
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "shop-grid",
                                children: products.map(function(product) {
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "shop-card".concat(tappedProduct === product.product_id ? " tapped" : ""),
                                        onClick: function() {
                                            return handleCardClick(product);
                                        },
                                        "data-testid": "product-".concat(product.product_id),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "shop-card-img",
                                                children: [
                                                    product.photo_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: getPhotoUrl(product.photo_url),
                                                        alt: product.title,
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            objectFit: 'cover',
                                                            transform: 'scale(1.0)',
                                                            transformOrigin: 'center'
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 381,
                                                        columnNumber: 23
                                                    }, _this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            width: '100%',
                                                            height: '100%',
                                                            background: '#111',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        },
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            style: {
                                                                color: 'rgba(255,255,255,0.2)',
                                                                fontFamily: "'Montserrat', sans-serif",
                                                                fontSize: '15px',
                                                                textTransform: 'uppercase',
                                                                letterSpacing: '0.2em'
                                                            },
                                                            children: "No Photo"
                                                        }, void 0, false, {
                                                            fileName: "[project]/pages/shop.tsx",
                                                            lineNumber: 388,
                                                            columnNumber: 25
                                                        }, _this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "shop-card-vignette"
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 391,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/shop.tsx",
                                                lineNumber: 379,
                                                columnNumber: 19
                                            }, _this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    padding: '0px 0px 0'
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        style: {
                                                            fontFamily: "'Montserrat', sans-serif",
                                                            fontSize: '23px',
                                                            color: '#060606',
                                                            margin: '0 0 4px',
                                                            fontWeight: 700
                                                        },
                                                        children: product.title
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 394,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "shop-card-mobile-title",
                                                        style: {
                                                            display: 'none'
                                                        },
                                                        children: product.title.split(' ')[0]
                                                    }, void 0, false, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 397,
                                                        columnNumber: 21
                                                    }, _this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        style: {
                                                            display: 'flex',
                                                            gap: '13px',
                                                            flexWrap: 'wrap',
                                                            marginBottom: '9px'
                                                        },
                                                        children: [
                                                            product.gem_type && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "shop-tag",
                                                                children: product.gem_type
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/shop.tsx",
                                                                lineNumber: 401,
                                                                columnNumber: 44
                                                            }, _this),
                                                            product.weight && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "shop-tag",
                                                                children: [
                                                                    product.weight,
                                                                    " ct"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/pages/shop.tsx",
                                                                lineNumber: 402,
                                                                columnNumber: 42
                                                            }, _this),
                                                            product.color && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "shop-tag",
                                                                children: product.color
                                                            }, void 0, false, {
                                                                fileName: "[project]/pages/shop.tsx",
                                                                lineNumber: 403,
                                                                columnNumber: 41
                                                            }, _this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/pages/shop.tsx",
                                                        lineNumber: 400,
                                                        columnNumber: 21
                                                    }, _this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/pages/shop.tsx",
                                                lineNumber: 393,
                                                columnNumber: 19
                                            }, _this)
                                        ]
                                    }, product.product_id, true, {
                                        fileName: "[project]/pages/shop.tsx",
                                        lineNumber: 373,
                                        columnNumber: 17
                                    }, _this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/pages/shop.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/shop.tsx",
                        lineNumber: 338,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$shared$2f$Footer$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                        fileName: "[project]/pages/shop.tsx",
                        lineNumber: 412,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 337,
                columnNumber: 7
            }, this),
            modalProduct && !showInvoicePreview && !showGuestPopup && !inquiryStep && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$ProductDetailModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                product: modalProduct,
                onClose: function() {
                    return setModalProduct(null);
                },
                onBuy: handleBuyClick,
                onInquire: handleInquiryClick,
                getPhotoUrl: getPhotoUrl
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 417,
                columnNumber: 9
            }, this),
            inquiryStep && modalProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InquiryModal$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                inquiryStep: inquiryStep,
                product: modalProduct,
                guestCollected: guestCollected,
                accountUser: accountUser,
                submitting: inquirySubmitting,
                onGuestInfoSubmit: handleGuestInfoForInquiry,
                onClose: closeInquiry,
                onDescSubmit: handleInquiryDescSubmit,
                onOK: handleInquiryOK
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 428,
                columnNumber: 9
            }, this),
            showGuestPopup && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$GuestInfoPopup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["GuestInfoPopup"], {
                onSubmit: handleGuestInfoSubmit,
                onClose: function() {
                    setShowGuestPopup(false);
                    setPendingAction(null);
                }
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 443,
                columnNumber: 9
            }, this),
            showInvoicePreview && modalProduct && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$guest$2f$InvoicePreviewPopup$2e$tsx__$5b$client$5d$__$28$ecmascript$29$__["InvoicePreviewPopup"], {
                product: modalProduct,
                adminInfo: adminInfo,
                buyerInfo: buyerInfo,
                onContinue: handleCheckout,
                onCancel: function() {
                    return setShowInvoicePreview(false);
                },
                loading: checkoutLoading
            }, void 0, false, {
                fileName: "[project]/pages/shop.tsx",
                lineNumber: 451,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(ShopPage, "RaGC3t7KPqf/oTvLQK4L/tPPTWg=");
_c = ShopPage;
var shopCss = "\n.shop-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n  gap: 24px;\n}\n.shop-card {\n  cursor: pointer;\n  transition: transform 400ms ease-out;\n}\n.shop-card:hover {\n  transform: translateY(0px);\n}\n.shop-card:hover .shop-card-img {\n  border-color: rgba(0, 0, 0, 0.16);\n  box-shadow: 0 18px 48px rgba(0,0,0,0.65);\n}\n.shop-card-img {\n  position: relative;\n  aspect-ratio: 1 / 1;\n  background: #ffffff20;\n  border-radius: 1.7px;\n  border: 1.7px solid rgba(20, 16, 16, 0.98);\n  overflow: hidden;\n  box-shadow: 0 0px 1px rgba(0,0,0,0.35);\n  transition: border-color 10ms ease-out, box-shadow 50ms ease-in;\n}\n.shop-card-vignette {\n  position: absolute;\n  inset: 10px;\n  box-shadow: inset 8 0 30px 12px rgba(0, 0, 0, 0.12);\n  pointer-events: none;\n  z-index: 2;\n}\n.shop-tag {\n  font-family: 'Montserrat', sans-serif;\n  font-size: 15px;\n  text-transform: uppercase;\n  letter-spacing: 0.13em;\n  color: rgba(228, 182, 44, 0.82);\n  background: rgba(34, 32, 32, 0.84);\n  border: 1px solid rgba(255,255,255,0.06);\n  padding: 0px 8px;\n}\n.shop-card-img img {\n  filter: grayscale(100%) invert(90%) contrast(1.3) brightness(0.90);\n  transition: filter 200ms cubic-bezier(0.05, 0.9, 0.1, 1);\n}\n.shop-grid .shop-card {\n  opacity: 2;\n  transition: transform 100ms ease-out, opacity 10ms ease;\n}\n.shop-grid:has(.shop-card:hover) .shop-card:not(:hover) {\n  opacity: 0.20;\n}\n.shop-card:hover .shop-card-img img {\n  filter: grayscale(0%) invert(0%) contrast(1.1) brightness(1.0);\n  transition: filter 40ms ease-in;\n}\n.shop-card-img::before {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.45);\n  pointer-events: none;\n  z-index: 3;\n  transition: background 2800ms cubic-bezier(0.05, 0.9, 0.1, 1);\n}\n.shop-card:hover .shop-card-img::before {\n  background: rgba(0, 0, 0, 0.0);\n  transition: background 40ms ease-in;\n}\n.shop-card-img::after {\n  content: '';\n  position: absolute;\n  inset: 0;\n  background: rgba(255, 240, 180, 0.0);\n  pointer-events: none;\n  z-index: 4;\n  transition: background 2800ms cubic-bezier(0.05, 0.9, 0.1, 1);\n}\n.shop-card:hover .shop-card-img::after {\n  background: rgba(255, 240, 180, 0.08);\n  transition: background 40ms ease-in;\n}\n@media (max-width: 767px) {\n  .shop-grid {\n    grid-template-columns: 1fr 1fr;\n    gap: 12px;\n    padding: 15px 15px;\n  }\n  .shop-card-img {\n    border-radius: 8px;\n  }\n  .shop-card-title {\n    font-family: 'Montserrat', sans-serif;\n    font-weight: 600;\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.2em;\n    color: #d4af37;\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    padding: 8px 0 0;\n  }\n  .shop-card .shop-tag { display: none; }\n  .shop-card h3 { display: none; }\n  .shop-card p { display: none; }\n  .shop-card-mobile-title { display: block; }\n  .shop-card-img img {\n    transition: filter 80ms ease-in;\n  }\n  .shop-card.tapped .shop-card-img img {\n    filter: grayscale(0%) invert(0%) contrast(1.0) brightness(1.0);\n  }\n  .shop-card.tapped .shop-card-img::before {\n    background: rgba(0, 0, 0, 0.0);\n  }\n  .shop-card.tapped .shop-card-img::after {\n    background: rgba(255, 240, 180, 0.08);\n  }\n}\n";
var _c;
__turbopack_context__.k.register(_c, "ShopPage");
if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_type_of$2e$js__$5b$client$5d$__$28$ecmascript$29$__["_"])(globalThis.$RefreshHelpers$) === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/shop.tsx [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

var PAGE_PATH = "/shop";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    function() {
        return __turbopack_context__.r("[project]/pages/shop.tsx [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/shop\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/shop.tsx [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__bafefa6b._.js.map